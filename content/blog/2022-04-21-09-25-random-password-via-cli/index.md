---
title: Random Password via CLI
description: Random Password via CLI
date: 2022-04-21 09:25
tags: [devops]
---

```bash
echo $RANDOM `date`|md5sum|base64|head -c 25
```
