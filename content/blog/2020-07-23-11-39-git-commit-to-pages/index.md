---
title: Git Commit to Pages
description: Git Commit to Pages
date: 2020-07-23 11:39
tags: ["git", "github pages"]
---

```bash
#!/usr/bin/env bash

MAIN_BRANCH=$(git branch --show-current)
GH_PAGES_BRANCH=gh-pages
ORIGIN_GITHUB_PAGES=<github pages repo>
ORIGIN_REPO_URL=<origin repo url>
DIST_DIR=dist

git branch -D $GH_PAGES_BRANCH 2>&1
git checkout --orphan $GH_PAGES_BRANCH

git reset .gitignore
git reset $DIST_DIR

git rm -rf .

cp -r $DIST_DIR/* .
rm -rf $DIST_DIR

git add .

git commit -a -m 'Deployed from $ORIGIN_REPO_URL' --no-verify

git remote add origin-github-pages $ORIGIN_GITHUB_PAGES 2>&1

git push origin-github-pages $GH_PAGES_BRANCH --force --no-verify

git checkout $MAIN_BRANCH
```
