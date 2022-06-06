import json
from datetime import datetime, timezone, timedelta

from flask import request, jsonify, Blueprint
from flask_jwt_extended import get_jwt, create_access_token, get_jwt_identity, unset_jwt_cookies

from login import checkLoginData, register

import bcrypt

loginAPI = Blueprint('loginAPI', __name__)

mySalt = bcrypt.gensalt()


@loginAPI.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@loginAPI.route('/api/token', methods=['POST'])
def token():
    user = json.loads(request.data)
    for key, value in user.items():
        if checkLoginData(key, value, mySalt):  # email,password
            access_token = create_access_token(identity=key)
            response = {"res": access_token}
            return response
        return {"res": "Wrong email or password"}, 401


@loginAPI.route('/api/logout', methods=['POST'])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@loginAPI.route('/api/register', methods=['POST'])
def registerUser():
    regData = json.loads(request.data)
    for key, value in regData.items():
        if len(key) > 10 and len(value) > 8:
            bytePwd = value.encode('utf-8')
            hashPw = bcrypt.hashpw(bytePwd, mySalt)
            response = register(key, hashPw)
            if response:
                return {"res": "successful"}
            return {"res": response}
        return{"res": "Invalid Email or password"}