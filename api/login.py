from dotenv import load_dotenv
from flask import Blueprint
import mariadb

load_dotenv()

security = Blueprint('security', __name__)

try:
    mydb = mariadb.connect(
        host='db',
        user='root',
        password="password",
        database="smarthome"

    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")


def create_connection():
    cursor = mydb.cursor(buffered=True)

    try:
        cursor.execute("CREATE TABLE user (email VARCHAR(255), password VARCHAR(255))")
    except mydb.connector.errors.ProgrammingError:
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
