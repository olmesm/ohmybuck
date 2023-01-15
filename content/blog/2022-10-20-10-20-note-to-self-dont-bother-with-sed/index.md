---
title: Supporting cross-platform sed
description:
date: 2022-10-20 10:20
tags: [sed, perl]
---

When it comes to scripting for both Mac and Linux, one popular choice is to use Perl for its simplicity in writing one-liners. For example, the following command can be used to replace all instances of "original" with "replacement" in a file:

```bash
perl -i -pe s|original|replacement| <file>
```

However, when it comes to cross-platform scripting, it's important to consider compatibility between different systems. One way to ensure compatibility is to use sed command, which is available on both Mac and Linux by default.

Here's an example of a script that can be used to replace all instances of "foo" with "bar" in a file named "file.txt":

```bash
#!/bin/sh

# Define the file and the search and replace strings
file="file.txt"
search="foo"
replace="bar"

# Check if the file exists
if [ ! -f "$file" ]; then
  echo "Error: $file does not exist"
  exit 1
fi

# Backup the original file
cp "$file" "$file.bak"

# Check if the '-i' option is supported
if sed --version 2>/dev/null | grep -q GNU; then
  # GNU sed
  sed -i "s/$search/$replace/g" "$file"
else
  # BSD sed
  sed -i "" "s/$search/$replace/g" "$file"
fi

echo "All instances of '$search' have been replaced with '$replace' in $file"
```
