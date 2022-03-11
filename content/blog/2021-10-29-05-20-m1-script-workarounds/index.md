---
title: M1 Script workarounds
description: M1 Script workarounds
date: 2021-10-29 05:20
tags: [mac, m1]
---

```bash
if [[ `sysctl -n machdep.cpu.brand_string` == *'Apple M1'* ]]; then
  # Mac M1's different arch workaround.
  NODE_VERSION=$(perl -lne 'print $1 if /^nodejs ([0-9.]*)$/im' .tool-versions)
  arch -x86_64 asdf install nodejs $NODE_VERSION
fi
```
