import os

import bcrypt
from dotenv import load_dotenv
from flask import Blueprint
import mariadb

load_dotenv()

security = Blueprint('security', __name__)

try:
    mydb = mariadb.connect(
        host='db',
        user=os.getenv('db_user'),
        password=os.getenv('db_password'),
        database="smarthome"

    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")


def create_connection():
    cursor = mydb.cursor(buffered=True)

    try:
        cursor.execute("CREATE TABLE user (email VARCHAR(255), password VARCHAR(255))")
    except:
        pass

    return cursor


def checkLoginData(email, password, salt):
    cursor = create_connection()

    bytePwd = password.encode('utf-8')
    sql = "SELECT password FROM user WHERE email=%s"
    val = email,
    cursor.execute(sql, val)

    myresult = cursor.fetchall()
    cursor.close()
    if len(myresult) == 0:
        return False
    if bcrypt.checkpw(bytePwd, myresult[0][0].encode('utf-8')):
        return True


def register(email, password):
    if checkEmail(email):
        return "Account existiert bereits"
    cursor = create_connection()

    sql = "INSERT INTO user (email, password) VALUES (%s, %s)"
    val = (email, password)
    cursor.execute(sql, val)

    mydb.commit()
    cursor.close()
    return True


def checkEmail(email):
    cursor = create_connection()
    sql = "SELECT * FROM user WHERE email =%s"
    val = email,
    cursor.execute(sql, val)

    myresult = cursor.fetchall()
    cursor.close()
    if len(myresult) >= 1:
        return True
    return False
