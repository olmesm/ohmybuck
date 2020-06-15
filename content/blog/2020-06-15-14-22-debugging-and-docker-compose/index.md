---
title: Debugging And Docker Compose
description: Debugging And Docker Compose
date: 2020-06-15 14:22
tags: ["devops", "docker", "python"]
---

Debugging python libraries inside a running docker container

```bash
# Find the running process
docker ps

# Execute a command inside the container
docker exec -it <container ID> bash

# Install an editor if none available
apt-get update && apt-get install -y vim

# Edit the library
vim <file>
```
