---
title: Remove All Files Listed in Gitignore
description: Clean up whats in the repo
date: 2021-06-30 08:43
tags: [git, devops]
---

[From Stackoverflow](https://stackoverflow.com/a/36573710)

When working with Git, it's important to keep your repository clean and organized. One way to do this is by using the .gitignore file to exclude files and directories that you don't want to track. However, sometimes you may have files that are not under version control that you want to remove from your repository. The git clean command is a useful tool that can help you accomplish this task.

The git clean command is used to recursively remove files that are not under version control. Before using the command, it is highly recommended to do a dry run to see what files will be removed, this can be accomplished by using the -xdn option.

```bash
git clean -xdn
```

This command will show you a list of all the files that will be removed and will not actually remove any files from your system.

Once you have reviewed the list and you are sure that you want to remove the files, you can use the -xdf option to execute the command and remove the files.

```bash
git clean -xdf
```

It's worth noting that git clean command is a powerful tool and it can be dangerous if you are not sure about what you are doing. It is recommended to be extra careful when using this command and to always do a dry run before you execute it.

In summary, the git clean command is a useful tool that can help you keep your repository clean and organized by removing files that are not under version control. It's important to be careful when using the command and to always do a dry run before you execute it.
