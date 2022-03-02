---
title: "Git Add Commit Push: Gitcp"
description: "Git Add Commit Push: Gitcp"
date: 2021-08-19 06:46
tags: [git]
---

```bash
function gitcp(){
    echo "Running...

    git add . && git commit -m '$1' && git push
"

    sleep 1.5

    git add . && git commit -m "$1" && git push
}
```
