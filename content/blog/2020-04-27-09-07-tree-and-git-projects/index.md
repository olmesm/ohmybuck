---
title: Tree And Git Projects
description: Tree And Git Projects
date: 2020-04-27-09-07
tags: ["git", "tree"]
---

Tree prints out directory structures via the terminal.

Install it with

```bash
brew install tree
```

The following will print out files in the current project structure, ignoring files in the `.gitignore` file.

```bash
git ls-tree -r --name-only HEAD | tree --fromfile
```
