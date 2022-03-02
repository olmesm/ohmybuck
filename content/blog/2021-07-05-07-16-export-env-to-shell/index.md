---
title: Export .env to shell
description: Export .env to Shell
date: 2021-07-05 07:16
tags: [devops, bash, shell, sh, dotenv]
---

```sh
#!/usr/bin/env sh

## Usage
## . ./export-env.sh <some-other.env>

ENV_FILE="${1:-.env}"

unamestr=$(uname)
if [ "$unamestr" = 'Linux' ]; then
  export $(grep -v '^#' "$ENV_FILE" | xargs -d '\n')
else
  export $(grep -v '^#' "$ENV_FILE" | xargs -0)
fi
```
