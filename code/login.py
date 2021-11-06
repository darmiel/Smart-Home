from flask import Blueprint, render_template, session,abort
from flask import Flask, render_template, request, url_for, redirect

from flask_login import login_required, current_user, login_user, logout_user, LoginManager
from werkzeug.security import generate_password_hash, check_password_hash


from datetime import timedelta

from models import UserModel,db,login, table_size

security = Blueprint('security',__name__)

login_manager = LoginManager()
login_manager.login_view = 'security.login'

@login_manager.user_loader
def load_user(user_id):
    return UserModel.query.get(int(user_id))

@security.route('/login', methods = ['POST', 'GET'])
def login():
    if current_user.is_authenticated:
        return redirect('/')

    if request.method == 'POST':
        email = request.form['email']
        user = UserModel.query.filter_by(email = email).first()
        if user is not None and user.check_password(request.form['password']):
            login_user(user,remember=True, duration=timedelta(days=50))
            return redirect('/')

    return render_template('login.html')

@security.route('/register', methods=['POST', 'GET'])
def register():
    if current_user.is_authenticated:
        return redirect('/')

    if table_size() >= 1:
        return redirect('/login')

    if request.method == 'POST':
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']

        if UserModel.query.filter_by(email=email).first():
            return ('Email already Present')

        user = UserModel(email=email, username=username)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return redirect('/login')
    return render_template('register.html')

@security.route('/logout')
def logout():
    logout_user()
    return redirect('/')