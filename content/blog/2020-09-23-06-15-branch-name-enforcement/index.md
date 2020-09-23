---
title: Branch Name Enforcement
description: Branch Name Enforcement
date: 2020-09-23 06:15
tags: [devops]
---

```bash
#!/usr/bin/env bash

# Requires branch names to be correctly formatted.
#
#   - `main`
#   - `master`
#   - `<feature|bug|patch>/<project code>-<ticket number>-<description>`

BRANCH_NAME=$(git symbolic-ref --short HEAD 2> /dev/null)

if [[ $BRANCH_NAME =~ ^main$ ]]; then
  exit 0
fi

if [[ $BRANCH_NAME =~ ^(feature|bug|patch)\/(([A-z]|[0-9]){0,4}-){2}([A-z0-9-]{1,50})$ ]]; then
  exit 0
fi

if [[ $BRANCH_NAME =~ ^master$ ]]; then
  exit 0
fi

echo "Did not match brnach naming rules set for the project"
exit 1
```

## Quick Setup

Assumes node and script location `scripts/check-branch-name.sh`

```bash
npm install -D husky

echo '{
    "hooks": {
      "pre-push": "sh scripts/check-branch-name.sh"
  }
}
' > .huskyrc
```
