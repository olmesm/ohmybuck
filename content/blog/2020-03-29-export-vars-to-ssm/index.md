---
title: "Export vars to SSM"
description: "Export vars to SSM"
date: 2020-03-29
tags: ["shell", "ssm", "aws", "devops"]
---

This gets any params in a `.env` file sent up to AWS SSM ready for the script in [Export SSM to shell](/2020-03-29-export-ssm-to-shell) to consume.

```bash
#!/bin/bash
VAR_ENV_FILE="$1"
VAR_SSM_PREFIX="$2"
OVERWRITE="$3"

# To use:
#   sh ./export-to-ssm.sh <VAR_ENV_FILE> <SSM_PREFIX>

# EXAMPLE
#   sh ./export-to-ssm.sh .env.example /application/project/environment/

if [ -z "$VAR_ENV_FILE" ]; then
  echo "It appears you did not specify a file with the list of variables to fetch"
  echo "sh ./export-to-ssm.sh .env.example /application/project/environment/"

  exit 1
fi

if [ -z "$VAR_SSM_PREFIX" ]; then
  echo "It appears you did not specify an SSM prefix"
  echo "sh ./export-to-ssm.sh .env.example /application/project/environment/"

  exit 1
fi

if [ "$OVERWRITE" = "overwrite" ]; then
  echo "[EXPORT TO SSM]: Overwriting of params enabled"
  OVERWRITE="--overwrite"
else
  echo "
[EXPORT TO SSM]: Overwriting of params is not enabled
                  Use the \"overwrite\" arg if needed"
  OVERWRITE=""
fi

echo "\n[EXPORT TO SSM STARTING]"

grep -v '^#' "$VAR_ENV_FILE" | while read LINE_ENV_VAR; do
  VARIABLE=$(echo $LINE_ENV_VAR | sed "s/=.*//" |
    xargs -I {} echo "$VAR_SSM_PREFIX{}")

  VALUE=$(echo $LINE_ENV_VAR | sed "s/.*=//")

  aws ssm put-parameter --name "$VARIABLE" --value "$VALUE" --type "String" $OVERWRITE >/dev/null &&
    echo "[SSM ADDED]: $VARIABLE" || echo "[SSM FAILED TO ADD]: $VARIABLE"
done

echo "\n[EXPORT TO SSM COMPLETED]"
```
