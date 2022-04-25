import threading
import time
from datetime import datetime

import schedule

from mqtt import mqttc

s2 = '00:30'  # for example

stop_threads = False

schedule_job = None


def job():
    mqttc.publish("esp8266/all", "trigger")


def run():
    global schedule_job

# if a schedule job exists cancel it
    if schedule_job is not None:
        schedule.cancel_job(schedule_job)
    time_format = '%H:%M'

    alarmtime = str(datetime.strptime(new_alarmtime, time_format) - datetime.strptime(s2, time_format))
    if len(alarmtime) != 8:
        alarmtime = "0" + alarmtime

    schedule_job = schedule.every().day.at(alarmtime).do(job)
    # if time in brackets is reached it does job() datetime
    # subtracts 30 minutes from alarmtime as the sunrise takes 30 minutes

    while True:
        global stop_threads

        schedule.run_pending()
        time.sleep(1)  # check time every second

        if stop_threads:
            break  # if stop_threads is True cancel thread


def start_thread(terminate, alarmtime):
    global stop_threads, new_alarmtime

    if not terminate:

        new_alarmtime = alarmtime[0]
        stop_threads = False

        alarm = threading.Thread(target=run)
        alarm.start()

    elif terminate:
        stop_threads = True
