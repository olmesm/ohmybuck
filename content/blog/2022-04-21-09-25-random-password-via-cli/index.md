---
title: Random Password via CLI
description: Random Password via CLI
date: 2022-04-21 09:25
tags: [devops]
---

Creating a secure and random password is an important task when it comes to protecting your online accounts and personal information. One way to generate a random password is by using a one-liner command in the terminal.

```bash
echo $RANDOM `date`|md5sum|base64|head -c 25
```

This command uses a combination of different tools to generate a random and secure password. The $RANDOM command generates a random number, and the date command generates the current date and time. These values are then passed through the md5sum command, which creates a 128-bit hash of the input. The output is then passed through the base64 command, which converts the hash into a base64 encoded string. Finally, the head command is used to display the first 25 characters of the encoded string, which serves as the final output for the password.

It's worth noting that this command does not take into account the entropy of the password, and the generated passwords may not be suitable for certain use cases such as encryption keys.

It is also important to use a different method of password generation such as a password manager, or using a cryptographically secure random number generator.

In any case, this command can be a quick and easy way to generate a random password when you're in a pinch, but it's always recommended to use a more secure method of password generation.
