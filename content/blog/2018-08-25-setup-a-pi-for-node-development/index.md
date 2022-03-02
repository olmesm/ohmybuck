---
title: "Setup a pi for node development"
description: "Setup your pi"
date: 2018-08-25
tags: ["raspberry pi", "node"]
---

Raspberry pi's are awesome little pieces of hardware. I've developed an internet radio, a torrent video player, and a scrum board display all running on the low-power device.

One of the things I battled with was getting the device setup with node quickly to start development. Below is what I've found to work reliably.

**Note:** The Pi's SSH session will be represented with `pi$`, and local machine with `$`

## Install Raspbian

[Download Raspbian Lite]. I would always suggest downloading the latest version avalable. Instructions to flash the SD card are up on the [RPI installing images] page.

## Enable SSH

Enable SSH on boot. Do this by placing a blank file saved with the name `ssh` - no extension, on the SD card `/boot` partition.

The SD `/boot` partition should be accessible via your machines default file browser.

Alternatively you can do this via terminal: on a mac

```bash
$ diskutil list

# look for the raspberry pi SD card and copy down the path
# it'll most likely be /dev/disk2

$ touch <PATH OF RASPBERRY SD CARD>/boot/ssh
```

Finally plug in the pi to your router, slip in the SD card, power it on.

## SSH in

Either use [Angry IP], or login to your home router (usually 192.168.0.1 or 192.168.1.1) and find the IP address of the pi.
You can also try using the pi device name `raspberrypi`

Open terminal and start up an [SSH session], logging in as the default user pi, password raspberry.

```bash
$ ssh pi@<YOUR PI IP>
# or try ssh pi@raspberrypi - your network may support it

The authenticity of host ...

Are you sure you want to continue connecting (yes/no)?
$ yes

Warning: Permanently added ...
pi@<YOUR PI IP>s password:
$ raspberry

...

pi@raspberrypi:~ $
```

We're in!

## Raspi-config

Two important steps are to expand your pi's filesystem and change the password. This is done via `raspi-config`

```bash
pi$ sudo raspi-config

# Select first option
# Once complete change your pi user's password via option 2

pi$ sudo reboot
```

## Install Node

I always recommend using [nvm] - even more so with a raspberry pi as it can be a real pain.

Depending on the version of the ARM chipset, you'll need to find the appropriate nodejs binary, or compile it yourself. [nvm] handles all of this for you.

As per installation steps on the [nvm] website:

```bash
# Get NVM
wget -qO- https://raw.githubusercontent.com/creationix/nvm/<GET THE LATEST VERSION FROM WEBSITE>/install.sh | bash

# Install latest lts node
pi$ nvm install node --lts

pi$ sudo reboot

# Let the pi reboot then SSH back in

# To verify that nvm has been installed, do:
pi$ command -v nvm
# which should output 'nvm' if the installation was successful.
```

## Install [mplayer]

This step is optional, but [mplayer] is a neat little terminal program allows us to stream internet radio.

```bash
pi$ sudo apt-get install -y mplayer2

# Test it out - dont forget to plug something in to your audio out
pi$ mplayer http://listen.181fm.com/181-eagle_128k.mp3
```

<!-- References -->

[angry ip]: https://angryip.org/
[download raspbian lite]: https://www.raspberrypi.org/downloads/raspbian/
[mplayer]: http://www.mplayerhq.hu/design7/dload.html
[nvm]: https://github.com/creationix/nvm
[rpi installing images]: https://www.raspberrypi.org/documentation/installation/installing-images/README.md
[ssh session]: https://support.rackspace.com/how-to/connecting-to-a-server-using-ssh-on-linux-or-mac-os/
