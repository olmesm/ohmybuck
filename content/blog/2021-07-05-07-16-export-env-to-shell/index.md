---
title: Export .env to shell
description: Export .env to Shell
date: 2021-07-05 07:16
tags: [devops, bash, shell, sh, dotenv]
---

a bash script that exports a .env file to the shell environment and ignores any lines of code that start with a hash:

```bash
#!/bin/bash

# Define the .env file path
env_file=".env"

# Check if the file exists
if [ ! -f "$env_file" ]; then
  echo "Error: $env_file does not exist"
  exit 1
fi

# Read the file line by line
while IFS= read -r line; do
  # Check if the line starts with a hash
  if [[ ! "$line" =~ ^#.* ]]; then
    # Export the line to the shell environment
    export "$line"
  fi
done < "$env_file"

echo "Environment variables from $env_file have been exported"
```

In this script, the variable env_file is set to the path of the .env file, and the script checks if the file exists. If the file does not exist, the script displays an error message and exits.

The script then uses a while loop to read the file line by line. Inside the loop, the script uses an if statement to check if the current line starts with a hash using the regular expression ^#.\*. If the line does not start with a hash, the script uses the export command to export the line to the shell environment.

Finally, after the end of the file, the script will display a message indicating that the environment variables from the .env file have been exported.

You can modify the script by changing the path of the env_file variable to the path of your .env file.

It's worth noting that this script assumes that the .env file contains only environment variables in the format KEY=VALUE, and that the file does not contain any syntax errors.
