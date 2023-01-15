---
title: Can We Replace Cookiecutter with Bash
description: Can We Replace Cookiecutter with Bash
date: 2023-01-15 16:15
tags: [cookiecutter, bash]
---

If you're a developer, you've likely heard of Cookiecutter - a popular tool that helps create projects from templates. But, did you know that you can accomplish the same tasks using bash? In this blog post, we'll explore how to use bash to recursively replace filenames, directories, and file content with specific strings, just like Cookiecutter. We'll also discuss the advantages and disadvantages of using bash versus a dedicated tool like Cookiecutter. Whether you're a seasoned developer or just starting out, this post will give you a new perspective on automating project setup. So, let's dive in and see if we can replace Cookiecutter with bash!

```bash
#!/bin/bash

# Define the directory to be searched
dir="./"

# Find all files and directories with the name "foo"
find $dir -name "foo" -print0 | while IFS= read -r -d $'\0' file; do
    # Replace the name "foo" with "bar" in the filename
    new_file="${file/foo/bar}"
    # Rename the file or directory
    mv "$file" "$new_file"

    # If the file is a regular file, replace the content "foo" with "bar"
    if [ -f "$new_file" ]; then
        sed -i 's/foo/bar/g' "$new_file"
    fi
done
```

This script will recursively search for files and directories named "foo" starting in the current directory (.). For each file or directory it finds, it will replace the name "foo" with "bar" and if the file is a regular file, it will also replace any instances of "foo" in the file's content with "bar" using the sed command.
