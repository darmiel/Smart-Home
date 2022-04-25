import json
from __main__ import socketio

from flask import request, redirect, Blueprint, render_template
from flask_login import login_required

from alarmthread import start_thread
from mqtt import mqttc, roomschecked
from wine import dropdown, select_wine, nested_list, delete_wine

numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
button_change = 0

alarmtime = ['07:00']

colors = Blueprint('colors', __name__)


@colors.route("/", methods=['GET', 'POST'])
@login_required
def main():
    global alarmtime

    if request.method == 'POST':

        if 'alarmtime' in request.form:  # if alarm button was pressed
            new_alarmtime = request.form.getlist('alarmtime')
            if new_alarmtime != alarmtime:  # if new_alarmtime from POST request is different, change alarmtime variable
                alarmtime = new_alarmtime
                return alarm()

        if 'rooms' in request.form:
            checked_rooms = request.form.getlist('rooms')

            for room in roomschecked:
                if room in checked_rooms:
                    roomschecked[room] = True
                else:
                    roomschecked[room] = False  # if box is checked set room to true, otherwise false

        if 'red' in request.form or 'green' in request.form or 'blue' in request.form:
            number_of_slider_r = request.form['red']  # checks value of sliders once submitted
            number_of_slider_g = request.form['green']
            number_of_slider_b = request.form['blue']

            all_numbers = number_of_slider_r + ';' + number_of_slider_g + ';' + number_of_slider_b
            # puts all values into a single string and pushes it via MQTT

            mqttc.publish('esp8266/CustomColor', all_numbers)

            return render_template('main.html', alarmstate=button_change, roomschecked=roomschecked,
                                   alarmtime=alarmtime, async_mode=socketio.async_mode, states=getStates())

        elif 'PresetColors' in request.form:
            return PresetColors()

        elif 'CustomColors' in request.form:
            return dropdown()

        elif 'alarm' in request.form:
            return alarm()

        elif 'wine' in request.form:
            return dropdown()

        elif 'LEDOff' in request.form:
            return action('0')
        else:
            wine_num = request.form.to_dict()
            delete_wine(wine_num)
            return redirect('/')
    else:
        return render_template('main.html', alarmstate=button_change, roomschecked=roomschecked, alarmtime=alarmtime,
                               async_mode=socketio.async_mode, states=getStates())


@colors.route('/wine', methods=['GET', 'POST'])
def wine():
    wine_name = request.args.get("wine")
    if wine_name is not None:
        data = json.loads(wine_name)
        results = select_wine(data)
    return render_template('wine.html', results=results,
                           winecategories=['name', 'year', 'color', 'grape', 'country', 'taste', 'rating', 'available',
                                           'rowno', 'column'], winelist=nested_list())


def getStates():
    states = {"sunset": "329,183,100",
              "relax": "169,279,324",
              "evening": "255,100,100",
              "pink": "355,282,293",
              "green": "100,235,162"
              }  # all preset colors

    return states


@colors.route("/PresetColors")
@login_required
def PresetColors():
    return render_template('PresetColors.html', states=getStates())


@colors.route("/CustomColors")
@login_required
def CustomColors():
    return render_template('CustomColors.html')


@colors.route("/<action>")
@login_required
def action(action):
    colors = getStates()
    # If the action part of the URL is "on," execute the code indented below:

    if action in numbers:
        action = int(action) - 1
        values = getStates().values()
        values_list = list(values)

        for key, value in roomschecked.items():
            if value == True:
                chanel = "esp8266/" + key  # post value in every channel that is set to true (living-room, bathroom etc)
                mqttc.publish(chanel, values_list[action])

            else:

                chanel = "esp8266/" + key
                mqttc.publish(chanel, "100,100,100")

    if action == '0':
        mqttc.publish("esp8266/all", "0")  # make sure to turn all LED's off

    global button_change
    return redirect('/')


@colors.route("/alarm")
@login_required
def alarm():
    global button_change
    if button_change == 0:
        button_change = 1
        mqttc.publish("esp8266/all", "alarm1")
        start_thread(False, alarmtime)

    else:
        button_change = 0
        mqttc.publish("esp8266/all", "alarm0")
        start_thread(True, alarmtime)

    return redirect('/')
