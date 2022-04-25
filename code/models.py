import sqlite3

from flask_login import LoginManager
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


def sql_connection():
    conn = sqlite3.connect('users.db')
    return conn


def table_size():
    conn = sql_connection()
    cursor_obj = conn.cursor()
    cursor = cursor_obj.execute('select * from users;')
    length = len(cursor.fetchall())
    return length

    if conn:
        conn.close()
        print("\nThe SQLite connection is closed.")


login = LoginManager()
db = SQLAlchemy()


class UserModel(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True)
    username = db.Column(db.String(100))
    password_hash = db.Column(db.String())

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


@login.user_loader
def load_user(id):
    return UserModel.query.get(int(id))
