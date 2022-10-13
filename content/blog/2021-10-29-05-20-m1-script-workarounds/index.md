---
title: M1 Script workarounds
description: M1 Script workarounds
date: 2021-10-29 05:20
tags: [mac, m1]
---

```bash
if [[ `sysctl -n machdep.cpu.brand_string` == *'Apple M1'* ]]; then
  # Mac M1s different arch workaround.
  NODE_VERSION=$(perl -lne 'print $1 if /^nodejs ([0-9.]*)$/im' .tool-versions)
  arch -x86_64 asdf install nodejs $NODE_VERSION
fi
```

For terraform via asdf

`Error: terraform version 0.15.5 not found`

```bash
if [[ `which sysctl && sysctl -n machdep.cpu.brand_string` == 'Apple M1' ]]; then
    # Mac M1s different arch workaround.
  export ASDF_HASHICORP_OVERWRITE_ARCH=amd64
fi

asdf install terraform 0.15.5
```
