---
title: Env File Checker 2
description: Env File Checker
date: 2020-05-23 14:48
tags: ["shell", "env", "devops"]
draft: true
---

## Check

```bash
#!/bin/bash

# Compare keys in .env.example and .env files
# Ignore lines starting with #

# Store the keys in the .env.example file in an array
example_keys=($(grep -v '^#' .env.example | cut -d '=' -f 1))

# Store the keys in the .env file in an array
env_keys=($(grep -v '^#' .env | cut -d '=' -f 1))

# Compare the two arrays and store the difference in a variable
diff_keys=($(comm -13 <(printf "%s\n" "${example_keys[@]}" | sort) <(printf "%s\n" "${env_keys[@]}" | sort)))

# If the difference variable is not empty, print the missing keys
if [ ${#diff_keys[@]} -ne 0 ]; then
  echo "The following keys are missing in the .env file:"
  for key in "${diff_keys[@]}"; do
    echo "$key"
  done
else
  echo "The .env file has all the same keys as the .env.example file"
fi

```

In the above script, we first store the keys in the .env.example file in an array example_keys using the grep and cut commands to ignore lines starting with # and extract the keys. Similarly, we store the keys in the .env file in an array env_keys. Then we use the comm command to compare the two arrays and store the difference in a variable diff_keys. Finally, we check if the diff_keys variable is not empty and print the missing keys if it is not.

## Sync

```bash
#!/bin/bash

# Store the env file keys in an array
env_keys=($(grep -v '^#' .env | cut -d= -f1))

# Loop through the keys in the env file
for key in "${env_keys[@]}"
do
    # Check if the key exists in the example file
    if ! grep -q "^$key=" .env.example; then
        # If it doesn't exist, append it to the example file
        echo "$key=" >> .env.example
    fi
done

# Store the example file keys in an array
example_keys=($(grep -v '^#' .env.example | cut -d= -f1))

# Loop through the keys in the example file
for key in "${example_keys[@]}"
do
    # Check if the key exists in the env file
    if ! grep -q "^$key=" .env; then
        # If it doesn't exist, remove it from the example file
        sed -i "/^$key=.*/d" .env.example
    fi
done
```

Please note that the above script is written for Unix-based systems and may not work on Windows. Also, the sed command used here may be different for different flavors of Unix (e.g. gsed on MacOS)
