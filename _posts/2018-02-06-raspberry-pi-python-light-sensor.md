---
layout: post
title: "Connect Digital Light Sensor to Raspberry Pi GPIOs and Read from it with Python"
tags: [raspberry-pi,python,gpio]
---

[This](https://www.amazon.de/gp/product/B01G8ZU1LI) *Digital Light Sensor* can be used.

First, the three pins on the light sensor need to be connected with *female-female* jumper wires to the Raspberry Pi's [GPIO](https://www.raspberrypi.org/documentation/usage/gpio/) pins:
```
VCC ---> 1 (3,3V)
GND ---> 6 (Ground)
DO  ---> 7 (GPIO 4)
```

Then, in *Python*, use this code to read from the sensor:
```python
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(4,GPIO.IN)

while True:
  print GPIO.input(4)
  time.sleep(1)
```

This code prints the sensor's status every second until canceled by the user (`Ctrl+C`).

Since the sensor is digital, it can only output `0` or `1` (for light *off*/*on*). So the sensor needs a predefined threshold of the level of brightness which it reports as light-on/off. This threshold can be fine-tuned by the potentiometer on the sensor. The optimal threshold can be found by turning the potentiometer-screw until the *DO-LED* is switched off. At this point it needs to be turned just a little bit back until the LED is powered again.

---
