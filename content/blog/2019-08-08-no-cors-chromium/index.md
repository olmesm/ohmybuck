---
title: "Disable cors in Chromium"
description: "Disable cors in Chromium"
date: 2019-08-08
tags: []
---

How to disable chrome security

```bash
open /Applications/Chromium.app --args \
  --disable-web-security --user-data-dir=/tmp
```
