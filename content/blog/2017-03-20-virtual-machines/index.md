---
title: "Virtual Machines"
description: "Why Virtual Machines and what to watch out for"
date: 2017-03-20
tags: ["tools", "virtual machines"]
---

Virtual Machines are super handy. Whether to test a different OS, isolate an environment, or be able to share a workspace with a client or colleague, I think it's awesome tool to have in your arsenal.

Being able to deploy a machine quickly also allows you argue the typical "it must be your machine" excuse - whichever side you fall on.

I would recommend VMWare on Windows and Virtualbox on Linux/OSX.

| OS | VM App |
|---|---|
| Windows | [VMWare Workstation Player](https://my.vmware.com/en/web/vmware/free#desktop_end_user_computing/vmware_workstation_player/12_0) |
| OSX | `brew cask install virtualbox` |

### Create a Virtual Machine

It's generally pretty straight forward:

1. Download an ISO of your VM OS eg: [Ubuntu](https://www.ubuntu.com/download/alternative-downloads)
1. Open your virtualisation software - VMWare or Virtualbox.
    - Linux/Mac: can install via [homebrew](https://brew.sh) with `brew cask install virtualbox`
1. Generally I usually set up the following:
    - Ram about 50% of the host machine.
    - CPU about 50% of the host machine.
    - CPU cores, 2 if a 64 bit ISO, 1 if 32 bit.
    - 10 gigs for the virtual hard drive.
1. Follow the remaining prompts and select your downloaded ISO.

### Internet Issues

Generally your VM will share your host's network connection. If you can't get internet from your host machine, you may need to change the network settings of your VM between NAT and bridged mode.

### Virtual Machines's corrupt easily

Don't let your machine sleep, hibernate, or power down without shutting down the VM. I've corrupted about three VM's on both Windows and Mac, with VMWare and Virtualbox respectively, by allowing the host PC to sleep. I've been working with VM's for around 3 years in a commercial environment and these have been the only major issues I've had with VM's.

I would also recommend always running the host machine from a fresh boot. A few times I had non-fatal issues with Windows and VMWare not booting the VM properly, which was normally resolved by rebooting.
