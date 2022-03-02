---
title: Git Commit to Pages
description: Git Commit to Pages
date: 2020-07-23 11:39
tags: ["git", "github pages"]
---

Rough script to handle the same functionality as [gh-pages-deploy](https://www.npmjs.com/package/gh-pages-deploy), but extends the functionality by deploying to a repo thats not the same as the origin.

Rather use [gh-pages-deploy](https://www.npmjs.com/package/gh-pages-deploy) if you don't need the above functionality.

```bash
#!/usr/bin/env bash

MAIN_BRANCH=$(git branch --show-current)
GH_PAGES_BRANCH=gh-pages
ORIGIN_GITHUB_PAGES=<github pages repo>
ORIGIN_REPO_URL=<origin repo url>
build_DIR=build

git branch -D $GH_PAGES_BRANCH 2>&1
git checkout --orphan $GH_PAGES_BRANCH

git reset .gitignore
git reset $build_DIR

git rm -rf .

cp -r $build_DIR/* .
rm -rf $build_DIR

git add .

git commit -a -m 'Deployed from $ORIGIN_REPO_URL' --no-verify

git remote add origin-github-pages $ORIGIN_GITHUB_PAGES 2>&1

git push origin-github-pages $GH_PAGES_BRANCH --force --no-verify

git checkout $MAIN_BRANCH
```
