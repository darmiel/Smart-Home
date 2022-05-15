import json
import time

from flask import request, Blueprint, render_template

from alarmthread import start_thread
from mqtt import mqttc

from login import checkLoginData, register

alarmtime = ['07:00']

colors = Blueprint('colors', __name__)

rooms_checked = {
    "living-room": True,
    "bathroom": True,
    "bedroom": True
}

loggedIn = False


@colors.route('/api/result', methods=['POST'])
def result():
    colors = json.loads(request.data)
    try:
        if colors['time'][0]:
            mqttc.publish("esp8266/all", "alarm1")
            start_thread(True, colors["time"][1])  # cancel running threads
            time.sleep(1)
            start_thread(False, colors["time"][1])
        else:
            mqttc.publish("esp8266/all", "alarm0")
            start_thread(True, colors["time"][1])
    except KeyError:
        action(colors["colors"])
    return "hello"


@colors.route('/api/react')
def react():
    return {'colors': ["Sunset", "Relax", "Evening", "Pink", "Green"]}


@colors.route('/api/tiles')
def tiles():
    return {'Tiles': ["Preset Colors", "Led Off", "Wine", "Alarm"]}


@colors.route('/api/rooms')
def rooms():
    return {'rooms_checked': rooms_checked
            }


@colors.route('/api/login', methods=['POST', 'GET'])
def login():
    global loggedIn
    try:
        user = json.loads(request.data)
        for key, value in user.items():
            if checkLoginData(key, value):  # email,password
                loggedIn = True
    except:
        pass

    if not loggedIn:
        return {'login': False}
    return {'login': True}


@colors.route('/api/register', methods=['POST'])
def registerUser():
    try:
        regData = json.loads(request.data)
        for key, value in regData.items():
            register(key, value)
    except:
        pass
    return "null"


def get_states():
    states = {"sunset": "329,183,100",
              "relax": "169,279,324",
              "evening": "255,100,100",
              "pink": "355,282,293",
              "green": "100,235,162"
              }  # all preset colors

    return states


def action(action):
    # If the action part of the URL is "on," execute the code indented below:
    values = get_states()
    if action.lower() in values:
        for room in rooms_checked:
            mqttc.publish("esp8266/" + room, values.get(action.lower()))

    if action == 'off':
        mqttc.publish("esp8266/all", "0")  # make sure to turn all LED's off
