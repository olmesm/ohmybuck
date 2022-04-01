---
title: Asdf Nodejs Mac m1
description: Asdf Nodejs Mac m1
date: 2022-04-01 10:28
tags: [nodejs, asdf]
---

Working in an older version of node where no precompiled binaries for the m1 can be a pain. Here are two methods to ease the pain with asdf.

## Patch with Rosetta

May not be as reliable but quick and easy. This may effect other binaries you use on your system and required the developer to be aware they need to change the shell everytime they enter the directory.

```bash
# Install Rosetta
softwareupdate --install-rosetta

# Run a shell session in x86
arch -x86_64 zsh

# Install the node version required
asdf install nodejs <node-version>
# ie asdf install nodejs 12.22.11
```

## Build from Source

Takes around 10mins but more reliable. Should also give better performance as there is no emulation occuring via rosetta.

```sh
#!/usr/bin/env zsh

# $ . ./script.sh <node-version>
# ie $ . ./script.sh 12.22.11

VERSION=$1

NODEJS_CONFIGURE_OPTIONS='--with-intl=full-icu --download=all' \
NODEJS_CHECK_SIGNATURES="no" \
asdf install nodejs ref:v$VERSION

mv ~/.asdf/installs/nodejs/{ref-v$VERSION,$VERSION}
asdf reshim nodejs
```
