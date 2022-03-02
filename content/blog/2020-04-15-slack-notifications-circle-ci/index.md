---
title: "Slack Notifications from Circle CI"
description: "Slack Notifications from Circle CI"
date: 2020-04-15
tags: ["shell", "slack", "devops", circleci]
---

Slack notifications from Circleci.

In `.circleci/config.yml`

```yaml
version: 2.1
...

jobs:
  test:
  ...
    steps:
      - run:
          name: Notify the team
          when: on_success
          command: . scripts/slack-notify.sh REGRESSION_PASS
      - run:
          name: Notify the team
          when: on_fail
          command: . scripts/slack-notify.sh REGRESSION_FAIL
  deploy:
  ...
    steps:
      - run:
          name: Notify the team
          when: on_fail
          command: . scripts/slack-notify.sh DEPLOY_FAIL
...
```

In `scripts/slack-notify.sh`

```bash
#! /usr/bin/env sh
SLACK_URL="https://hooks.slack.com/services/<WORKSPACE_ID>/<WEBHOOK_STRING>"
SLACK_CHANNEL="#<TEAM_CHANNEL>"
SLACK_REGRESSION_BOT_NAME="The Ghost of Regression"
SLACK_DEPLOY_BOT_NAME="The Ghost of Regression"
ARTIFACTS_URL="https://app.circleci.com/jobs/github/<GITHUB_ORG>/<GITHUB_REPO>/$CIRCLE_BUILD_NUM/artifacts"

function func_regression_pass() {
  curl -X POST \
    --data-urlencode "payload={\"channel\": \"$SLACK_CHANNEL\", \"username\": \"$SLACK_REGRESSION_BOT_NAME\", \"text\": \"No regressions last night!\n\nView the pipeline here: $CIRCLE_BUILD_URL\", \"icon_emoji\": \":ghost:\"}" \
    "$SLACK_URL"
}

function func_regression_fail() {
  curl -X POST \
    --data-urlencode "payload={\"channel\": \"$SLACK_CHANNEL\", \"username\": \"$SLACK_REGRESSION_BOT_NAME\", \"text\": \"*BOO!*\nSome regressions were found in the night.\n\nView the pipeline here: $CIRCLE_BUILD_URL\nThere may be also be immediate clues as to why the process failed here: $ARTIFACTS_URL\n\n*Please list the findings of this failure in a :thread: below*\", \"icon_emoji\": \":ghost:\"}" \
    "$SLACK_URL"
}

function func_deploy_fail() {
  curl -X POST \
    --data-urlencode "payload={\"channel\": \"$SLACK_CHANNEL\", \"username\": \"$SLACK_DEPLOY_BOT_NAME\", \"text\": \"Looks like something got in the way of shipping it\n\nView the pipeline here: $CIRCLE_BUILD_URL\n\n*Please list the findings of this failure in a :thread: below*\", \"icon_emoji\": \":mount_fuji:\"}" \
    "$SLACK_URL"
}

if [ "$1" = "REGRESSION_PASS" ]; then
  func_regression_pass
fi

if [ "$1" = "REGRESSION_FAIL" ]; then
  func_regression_fail
fi

if [ "$1" = "DEPLOY_FAIL" ]; then
  func_deploy_fail
fi

if [ -z "$1" ]; then
  echo "You'll need to specify a PASS or FAIL argument"
  exit 1
fi
```
