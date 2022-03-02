---
title: "Export SSM to shell"
description: "Export SSM to shell"
date: 2020-03-29
tags: ["shell", "ssm", "aws", "devops"]
---

This gets any params set in AWS SSM and exports it to the running shell.

```bash
#!/bin/bash

VAR_ENV_FILE="$1"
VAR_SSM_PREFIX="$2"

# To use:
# . export-ssm-to-shell.sh <VAR_ENV_FILE> <SSM_PREFIX>

# EXAMPLE
#   . ./export-ssm-to-shell.sh .env.example /application/project/environment/

if [ -z "$VAR_ENV_FILE" ]; then
  echo "It appears you did not specify a file with the list of variables to fetch"
  echo ". ./export-ssm-to-shell.sh .env.example /application/project/environment/"

  exit 1
fi

if [ -z "$VAR_SSM_PREFIX" ]; then
  echo "It appears you did not specify an SSM prefix"
  echo ". ./export-ssm-to-shell.sh .env.example /application/project/environment/"

  exit 1
fi

LIST_ENV_VARS=$(grep -v '^#' "$VAR_ENV_FILE" | sed "s/=.*//" |
  xargs -I {} echo "$VAR_SSM_PREFIX{}" |
  tr '\n' ' ')

LIST_ENV_VAR_WITH_VALUES=$(aws ssm get-parameters --names $(echo "$LIST_ENV_VARS") |
  jq -r ".Parameters[] | (.Name + \"=\" + .Value)")

echo "\n[EXPORT STARTING]"

echo $LIST_ENV_VAR_WITH_VALUES | while read LINE_ENV_VAR; do
  CLEAN_ENV_VAR=$(echo "$LINE_ENV_VAR" |
    sed "s|$VAR_SSM_PREFIX||")

  export "$CLEAN_ENV_VAR"

  echo "[EXPORT SUCCESS]: $(echo $LINE_ENV_VAR | sed "s/=.*//")"
done

echo "\n[EXPORT COMPLETED]"
```
