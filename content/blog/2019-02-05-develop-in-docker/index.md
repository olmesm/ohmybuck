---
title: "Develop in Docker"
description: "Don't fight the system"
date: 2019-02-05
tags: ["tools", "docker"]
---

A common issue when working with multiple OS's is trying to keep the dependencies stable across all the various development and build environments.

One solution is to work in the docker container you plan to build or run the application in.

```bash
WORK_DIR=/usr/app; \        # Define container work directory #
  docker run --rm -it \     # Run the container with interactive terminal and destory on exit #
  -p 8001:8001 \            # Bind to port #
  -v $(pwd)/src:"$WORK_DIR"/src \ # Map local to container volume #
  -w "$WORK_DIR" \          # entry point #
  node:alpine sh            # type of container and start command
```

Packages are installed in the container and are the correct ones for the container OS.

I run this blog locally using the same method - [see here](https://gitlab.com/olmesm/hugo-blog/tree/master/scripts/run-dev.sh)
