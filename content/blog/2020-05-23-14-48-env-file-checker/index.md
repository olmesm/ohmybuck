---
title: Env File Checker
description: Env File Checker
date: 2020-05-23 14:48
tags: ["shell", "env", "devops"]
---

Ideally used as part of a pre-commit hook. This ensures your project's `.env.example` file contains the same vars as your local `.env` file.

````bash
#! /usr/bin/env sh

VAR_ENV_FILE=${1:-".env"}
VAR_ENV_EXAMPLE_FILE=${2:-".env.example"}
IS_STRICT=true

# To use:
#   sh scripts/check-env.sh [<VAR_ENV_FILE> <VAR_ENV_EXAMPLE_FILE>]

# EXAMPLE
#   sh ./scripts/check-env.sh [.env .env.example]

# Ensure `.gitignore` contains the following

# ```
# .env*
# !.env.example
# ```

if [ -z "$VAR_ENV_FILE" ]; then
  echo "Failed to find \`$VAR_ENV_FILE\`"
  echo "Please create it or specify a different file"
  echo "sh ./scripts/check-env.sh [.env .env.example]"

  exit 1
fi

if [ -z "$VAR_ENV_EXAMPLE_FILE" ]; then
  echo "Failed to find \`$VAR_ENV_EXAMPLE_FILE\`"
  echo "Please create it or specify a different file"
  echo "sh ./scripts/check-env.sh [.env .env.example]"

  exit 1
fi

echo "\n[CHECKING \`$VAR_ENV_FILE\` AND \`$VAR_ENV_EXAMPLE_FILE\`]"

for LINE_ENV_VAR in $(grep -v '^#' "$VAR_ENV_FILE"); do
  VARIABLE=$(echo $LINE_ENV_VAR | sed "s/=.*//")

  REF_COUNT=$(awk "/^$VARIABLE[=| ]/" "$VAR_ENV_EXAMPLE_FILE" | wc -l)

  if [[ "$REF_COUNT" -ne "1" ]]; then
    HAS_FOUND_MISMATCH=true
    echo "[MISSING VAR]: $VARIABLE"
  fi
done

echo "\n[CHECKING COMPLETED]"

if { [ "$IS_STRICT" = true ] && [ "$HAS_FOUND_MISMATCH" = true ]; }; then
  exit 1
fi

exit 0
````
