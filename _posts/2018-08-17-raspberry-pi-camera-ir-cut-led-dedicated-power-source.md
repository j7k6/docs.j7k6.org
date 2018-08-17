---
layout: post
title: "Use Raspberry Pi Camera IR-CUT LED with Dedicated Power Source and Trigger via GPIO"
tags: [raspberry-pi]
---

I baught a night-vision IR Camera for the Raspberry Pi by [Electreeks](https://www.amazon.de/gp/product/B0763Q5ZBS) (I suspect it to be similar to the [Waveshare IR-CUT Camera](https://www.waveshare.com/rpi-ir-cut-camera.htm)). Although it's a nice and cheap option for a night-vision camera, it comes with some annoying drawbacks.

> *Note*: I only used one of the LEDs!

## Dedicated Power Source
### Problem #1:
The camera is connected to the Raspberry Pi with a flex cable and there is no way to disable it once the Pi is up. That's okay for the camera alone, but this means that the LEDs constantly draw power from the Pi, even when not in use. Besides being not very energy efficient, they also get extremely hot. There is no way to turn them off on software level.

To get around this limitations, I decided to disconnect it from the the camera and power it with its own power source. The easiest way I thought was to just cut open an unused USB cable and use the red (+5V) and black (-5V) wires as dedicated power source for the LED. But of course it wasn't as easy as that...

### Problem #2:
Although the camera itself uses the Pi's 5V output, the LEDs only work with 3.3V. So I used a **DC-DC Step Down Converter** ([Mini360 LM2596](https://www.amazon.de/dp/B01M4NJNTP)) to regulate the 5V power output of the USB cable down to 3.3V. The converter comes with a tiny poti, which needs to be adjusted with a screw-driver (and a multi-meter!) until it outputs exaclty 3.3V.

## GPIO Trigger
### Hardware (MOSFET)
Besides being on a dedicated power source, I also wanted the LED to only be powered on when needed, which is right before and while the camera is taking a photo. For this a **MOSFET** ([IRLZ34N](https://www.amazon.de/dp/B01LXBK4QJ)) is being used to control the power output via a software triggered GPIO pin on the Raspberry Pi.

### Software (Python)
To trigger the LED's state, only a few lines of Python are necessary:

```python
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.OUT)

GPIO.output(23, GPIO.HIGH) # = Power on
GPIO.output(23, GPIO.LOW) # = Power off
```

---

This is how everything is connected:

```
                                   Raspberry Pi Zero
                            +-------------------------------+
                            |                               |
                            |    GND         GND   GPIO23   |
                            |    +           +     +        |
                            +-------------------------------+
                                 |           |     |
                                 |           |     |Gate
       +-----+   +---------+     |           |     +----+-------+
USB    |  -5V| - |    -3.3V| ----+           |          |       |
(5V)+--+     |   |         |              +------+ +----+Drain  | MOSFET
       |  +5V| - |    +3.3V| -----+       |  |          |       | (IRLZ34N)
       +-----+   +---------+      |       |  +---+ +----+-------+
                  Step-Down       |       |        Source
                  Converter     +-----------+
                                | +3.3V   -3.3V
                                |    ---    |
                                |   |   |   |
                                |    ---    |
                                |           |
                                 -----------
                                   IR LED
```


---
1. <https://dordnung.de/raspberrypi-ledstrip/>
