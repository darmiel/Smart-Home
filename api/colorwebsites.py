import json
import time

from flask import request, Blueprint
from flask_jwt_extended import jwt_required

from alarmthread import start_thread
from mqtt import mqttc

alarmtime = ['07:00']

colors = Blueprint('colors', __name__)

rooms_checked = {
    "living-room": True,
    "bathroom": True,
    "bedroom": True
}

loggedIn = False


@colors.route('/api/result', methods=['POST'])
@jwt_required()
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
@jwt_required()
def react():
    return {'colors': ["Sunset", "Relax", "Evening", "Pink", "Green"]}


@colors.route('/api/tiles')
@jwt_required()
def tiles():
    return {'Tiles': ["Preset Colors", "Led Off", "Wine", "Alarm"]}


@colors.route('/api/rooms')
@jwt_required()
def rooms():
    return {'rooms_checked': rooms_checked
            }


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
