---
title: Remove All Files Listed in Gitignore
description: Clean up whats in the repo
date: 2021-06-30 08:43
tags: [git, devops]
---

[From Stackoverflow](https://stackoverflow.com/a/36573710)

As the files in .gitignore are not being tracked, you can use the git clean command to recursively remove files that are not under version control.

Use `git clean -xdn` to perform a dry run and see what will be removed.
Then use `git clean -xdf` to execute it.
