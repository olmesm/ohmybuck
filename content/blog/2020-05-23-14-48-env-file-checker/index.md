---
title: Env File Checker
description: Env File Checker
date: 2020-05-23 14:48
tags: ["shell", "env", "devops"]
---

Ideally used as part of a pre-commit hook. This ensures your project's `.env.example` file contains the same vars as your local `.env` file.

The `.env.example` is a list of required environment variables for working in the project. We correspond to a value that we use in a `.env` file, however in a `.env.example` we should either set a non-secret value, or a comment on how to obtain the required key.

````bash
#! /usr/bin/env sh

VAR_ENV_FILE=${1:-".env"}
VAR_ENV_EXAMPLE_FILE=${2:-".env.example"}
IS_STRICT=true

# To use:
#   sh scripts/check-env.sh [<VAR_ENV_FILE> <VAR_ENV_EXAMPLE_FILE>]

# EXAMPLE
#   sh ./scripts/check-env.sh [$VAR_ENV_FILE $VAR_ENV_EXAMPLE_FILE]

# Ensure `.gitignore` contains the following

# ```
# .env*
# !.env.example
# ```

if [ -z "$VAR_ENV_FILE" ]; then
  echo "Failed to find \`$VAR_ENV_FILE\`"
  echo "Please create it or specify a different file"
  echo "sh ./scripts/check-env.sh [$VAR_ENV_FILE $VAR_ENV_EXAMPLE_FILE]"

  exit 1
fi

if [ -z "$VAR_ENV_EXAMPLE_FILE" ]; then
  echo "Failed to find \`$VAR_ENV_EXAMPLE_FILE\`"
  echo "Please create it or specify a different file"
  echo "sh ./scripts/check-env.sh [$VAR_ENV_FILE $VAR_ENV_EXAMPLE_FILE]"

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

  echo "\n[NOTE] Loads of errors?
There should be no spaces between the variable declaration and value in your $VAR_ENV_FILE file.

\`\`\`
# $(pwd)/$VAR_ENV_FILE

ENVIRONMENT_VARIABLE=VALUE
\`\`\`
"
  exit 1
fi

exit 0
````

Using this script in a node ([gatsby-starter-default](https://github.com/gatsbyjs/gatsby-starter-default)) project with husky pre-commit hooks

```bash
echo "
####################
# `.env.example` is a list of required env vars for working in the project.
#
# Normally a variable is set to a value for use in the application.
# However in a `.env.example` you should either
#     - set a non-secret value (safe for publishing or publicly accessible)
#     - comment on how to obtain the required key
#
# For debugging variables, default to values that help the developer.
####################

ENVIRONMENT_VARIABLE=VALUE
" > .env.example

touch .env

npm install -D husky

echo '{
    "hooks": {
      "pre-commit": "sh scripts/check-env.sh && npm run format",
      "post-commit": "git update-index --again"
  }
}
' > .huskyrc
```
