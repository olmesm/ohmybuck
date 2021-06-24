---
title: Container shell Forwarding Signals to Child Processes
description: Container shell Forwarding Signals to Child Processes
date: 2021-06-24 10:33
tags: ["cloud run", devops, docker]
---

If your application does not receive the termination signal on Cloud Run, the most prominent reason for this might be because your application is not running as the init process (PID 1) and its parent process is not forwarding the signal appropriately.

The leading reason why this happens is that the ENTRYPOINT statement in your container image’s Dockerfile is not set directly to your application process. For example, the Dockerfile statement:

```yaml
ENTRYPOINT node server.js
```

internally is translated to:

```yaml
ENTRYPOINT ["/bin/sh", "-c", "node server.js"]
```

when your Dockerfile is executed to build a container image.

Most notably, the GNU /bin/sh and other shells like bash do not forward signals to child processes by default. Therefore, you should write your entrypoint statements in the vector form, like the following, to prevent your app to be executed as the sub-process of a shell:

```yaml
ENTRYPOINT ["node", "server.js"]
```

[Resource: Graceful shutdowns on Cloud Run](https://cloud.google.com/blog/topics/developers-practitioners/graceful-shutdowns-cloud-run-deep-dive)
