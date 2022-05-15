import sqlite3

import os
from dotenv import load_dotenv
from flask import Blueprint
import mysql.connector

load_dotenv()

security = Blueprint('security', __name__)

mydb = mysql.connector.connect(
    host="127.0.0.1",
    user=os.getenv('db_user'),
    password=os.getenv('db_password'),
    database=os.getenv('db_addr')
)


def create_connection():
    cursor = mydb.cursor(buffered=True)

    try:
        cursor.execute("CREATE DATABASE %s", {os.getenv('db_addr')})
    except mysql.connector.errors.DatabaseError:
        cursor.execute("SHOW DATABASES")

    try:
        cursor.execute("CREATE TABLE user (email VARCHAR(255), password VARCHAR(255))")
    except mysql.connector.errors.ProgrammingError:
        pass

    return cursor


def checkLoginData(email, password):
    cursor = create_connection()

    sql = "SELECT * FROM user WHERE email =%s AND password=%s"
    val = (email, password)
    cursor.execute(sql, val)

    myresult = cursor.fetchall()
    cursor.close()
    if len(myresult) == 1:
        return True
    return False


def register(email, password):
    cursor = create_connection()
    sql = "INSERT INTO user (email, password) VALUES (%s, %s)"
    val = (email, password)
    cursor.execute(sql, val)

    mydb.commit()
    cursor.close()
