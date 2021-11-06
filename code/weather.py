import requests, json
import schedule
import time
import threading
from mqtt import mqttc
from dotenv import load_dotenv
import os

weatherdata = ['0','0']

def get_weather():

    api_key = os.getenv('api_key')
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    city_name = os.getenv('city_name')

    complete_url = base_url + "appid=" + api_key + "&q=" + city_name
    response = requests.get(complete_url)

    x = response.json()

    if x["cod"] != "404":

        y = x["main"]
        current_temperature = y["temp"]
        current_pressure = y["pressure"]
        current_humidity = y["humidity"]

        z = x["weather"]
        weather_description = z[0]["description"]

        weatherdata[0] = str(round(current_temperature -273.15,2))
        weatherdata[1] = str(current_humidity)



def job():
	get_weather()

def run():

    schedule.every(10).minutes.do(job)

    while True:

        schedule.run_pending()
        time.sleep(10) #check time every second



def startthread():

    weathert = threading.Thread(target = run)
    weathert.start()

startthread()
