import socket

import paho.mqtt.client as mqtt

mqttc = mqtt.Client()
try:
    mqttc.connect("localhost", 1883) #localhost for server
except socket.gaierror:
    mqttc.connect("10.0.0.10", 1883) #debugging on windows machine, replace with IP of your server
mqttc.loop_start()
