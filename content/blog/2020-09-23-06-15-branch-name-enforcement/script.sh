#!/usr/bin/env bash

BRANCH_NAME=$(git symbolic-ref --short HEAD 2> /dev/null)

[[ $BRANCH_NAME =~ ^main$ ]] && exit 0
[[ $BRANCH_NAME =~ ^(feature|bug|patch)\/(([A-z]|[0-9]){0,4}-){2}([A-z0-9-]{1,50})$ ]] && exit 0
[[ $BRANCH_NAME =~ ^master$ ]] && exit 0

echo "Did not match rules set in the project"

exit 1
