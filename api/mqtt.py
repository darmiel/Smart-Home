import paho.mqtt.client as mqtt

rooms_checked = {
    "living-room": True,
    "bathroom": True,
    "bedroom": True
}


# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, rc):
    print("Connected with result code " + str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("/esp8266/temperature")
    client.subscribe("/esp8266/humidity")
    client.subscribe("/esp8266/state")


# The callback for when a PUBLISH message is received from the ESP8266.
def on_message(message):
    # socketio.emit('my variable')
    if message.topic == "/esp8266/state":
        if message.payload.decode("UTF-8") == "Aus":
            mqttc.publish("esp8266/all", "0")
        elif message.payload.decode("UTF-8") == "An":
            for room in rooms_checked:
                chanel = "esp8266/" + room
                mqttc.publish(chanel, "255,100,100")


mqttc = mqtt.Client()
mqttc.connect("10.0.0.10", 1883)
mqttc.loop_start()
