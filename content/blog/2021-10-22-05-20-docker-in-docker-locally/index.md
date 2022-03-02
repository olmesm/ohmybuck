---
title: Docker in Docker locally
description: Docker in Docker locally
date: 2021-10-22 05:20
tags: [devops, docker]
---

```bash
docker run -v /var/run/docker.sock:/var/run/docker.sock --rm -it docker sh
```

## References

- https://devopscube.com/run-docker-in-docker/
