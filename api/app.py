from datetime import timedelta

import eventlet
from flask_jwt_extended import JWTManager

eventlet.monkey_patch()

from flask import Flask
from flask_cors import CORS

app = Flask(__name__, static_folder='../frontend/build')

from dotenv import load_dotenv
import os

load_dotenv()

app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2000)
jwt = JWTManager(app)

CORS(app)


from colorwebsites import colors as cw_blueprint
from login import security as login_blueprint
from wine import wine as wine_blueprint
from loginAPI import loginAPI as loginAPI_blueprint



app.register_blueprint(cw_blueprint)
app.register_blueprint(login_blueprint)
app.register_blueprint(wine_blueprint)
app.register_blueprint(loginAPI_blueprint)


if __name__ == "__main__":
    #   socketio.run(app, host='0.0.0.0', port=8181, keyfile='key.pem', certfile='cert.pem')
    app.run(host='0.0.0.0', port=5000)
