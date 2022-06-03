import eventlet

eventlet.monkey_patch()

from flask import Flask
from flask_cors import CORS

app = Flask(__name__, static_folder='../frontend/build')

CORS(app)

from dotenv import load_dotenv
import os

from colorwebsites import colors as cw_blueprint
from login import security as login_blueprint
from wine import wine as wine_blueprint


load_dotenv()

app.register_blueprint(cw_blueprint)
app.register_blueprint(login_blueprint)
app.register_blueprint(wine_blueprint)


if __name__ == "__main__":
    #   socketio.run(app, host='0.0.0.0', port=8181, keyfile='key.pem', certfile='cert.pem')
    app.run(host='0.0.0.0', port=5000)
