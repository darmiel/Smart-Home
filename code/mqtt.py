from __main__ import socketio

import paho.mqtt.client as mqtt

roomschecked = {
    "living-room": True,
    "bathroom": True,
    "bedroom": True
}


# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("/esp8266/temperature")
    client.subscribe("/esp8266/humidity")
    client.subscribe("/esp8266/state")


# The callback for when a PUBLISH message is received from the ESP8266.
def on_message(client, userdata, message):
    # socketio.emit('my variable')

    if message.topic == "/esp8266/temperature":
        socketio.emit('dht_temperature', message.payload.decode("UTF-8"), broadcast=True)
    if message.topic == "/esp8266/humidity":
        socketio.emit('dht_humidity', message.payload.decode("UTF-8"), broadcast=True)
    if message.topic == "/esp8266/state":
        if message.payload.decode("UTF-8") == "Aus":
            mqttc.publish("esp8266/all", "0")
        elif message.payload.decode("UTF-8") == "An":
            for room in roomschecked:
                chanel = "esp8266/" + room
                mqttc.publish(chanel, "255,100,100")


mqttc = mqtt.Client()
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.connect("localhost", 1883)
mqttc.loop_start()
