# Local Network Smart Home

 

## Table of contents

 

* [General info](#general-info)

* [Setup of Raspberry](#setup-of-raspberry)

* [Setup of Network](#setup-of-network)

* [Setup of ESP](#setup-of-esp)

* [Demo](#demo)

 

## General info

 

This is a local network smarthome. It mainly controls LED strips, it also has an included newsfeed. The LED strip and weather information can only be accessed if you are connected to the same network as the server.

It can also set an alarm and will start to simulate a sunrise to slowly wake up the user. If you set the alarm at 7 am the sunrise will begin to simulate at 6:30 am. 
It takes 30 minutes to reach full brightness.

 

## Setup of Raspberry

 

First of all you have to set up the Raspberry Pi (i used the raspberry pi OS light), download the code and create a .env
file with the apps secret key. I also strongly recomment to set up a [static IP](https://raspberrypi-guide.github.io/networking/set-up-static-ip-address).

If you want to change the rooms that you can individually control you have to edit the colorwebsites.py file.

Just add the individual room to:

```
roomschecked = {
"living-room": True,
"bathroom": True,
"bedroom": True
}
```

Next install [Docker compose](https://www.simplilearn.com/tutorials/docker-tutorial/raspberry-pi-docker) and create an .env file.
(See .env.example). Remember that the password and user have to be the same that you set for your database in the docker compose file.

## Setup of Network
In deployment/nginx.conf change every:

```
yourUrl
```

to the name of your domain. Also remember to install and create certificates with [certbot](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/)

Now you're ready to run 
```
docker compose up --build
```

## Setup of ESP

Change:

```
const char *area =; //Add room that the ESP should be associated with
const char *ChipID =; //needs a unique ID, doesn't need to be specific

const char *ssid = ""; //wifi network
const char *password = ""; //wifi password

const char *mqtt_server = ""; //IP address of your raspberry
```

## Demo

[Demo video](https://youtu.be/O2QIoRbDFmk)