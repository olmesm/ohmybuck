---
title: Import SSM
description: Import SSM
date: 2020-05-29 06:52
tags: ["shell", "ssm", "aws", "devops"]
---

This gets any params in a `.env` file for local use from SSM.

```bash
#!/bin/bash

VAR_ENV_FILE="$1"
VAR_SSM_PREFIX="$2"

# To use:
# sh import-ssm.sh <VAR_ENV_FILE> <SSM_PREFIX>

# EXAMPLE
#   sh import-ssm.sh .env.example /application/project/environment/

if [ -z "$VAR_ENV_FILE" ]; then
  echo "It appears you did not specify a file with the list of variables to fetch"
  echo "sh import-ssm.sh .env.example /application/project/environment/"

  exit 1
fi

if [ -z "$VAR_SSM_PREFIX" ]; then
  echo "It appears you did not specify an SSM prefix"
  echo "sh import-ssm.sh .env.example /application/project/environment/"

  exit 1
fi

echo "\n[STARTED IMPORT FROM SSM]"

rm $VAR_ENV_FILE.raw*
rm $VAR_ENV_FILE.local*

grep -v '^#' "$VAR_ENV_FILE" | while read LINE_ENV_VAR; do
  UNPREFIXED_VAR=$(echo $LINE_ENV_VAR | sed "s/=.*//")
  VARIABLE=$(echo $UNPREFIXED_VAR |
    xargs -I {} echo "$VAR_SSM_PREFIX{}")

  VALUE=$(echo $LINE_ENV_VAR | sed "s/.*=//")

  LOOP_PARAM=$(aws ssm get-parameter --name "$VARIABLE")
  LOOP_VALUE=$(echo $LOOP_PARAM | jq -r ".Parameter | .Value" | sed 's/"/\\\"/g')

  echo "$VARIABLE=\"$LOOP_VALUE\"" >>$VAR_ENV_FILE.raw
  echo "$UNPREFIXED_VAR=\"$LOOP_VALUE\"" >>$VAR_ENV_FILE.local

  echo "[IMPORTED]: $VARIABLE" || echo "[SSM FAILED TO ADD]: $VARIABLE"
done

echo "\n[COMPLETED IMPORT FROM SSM]"
```
