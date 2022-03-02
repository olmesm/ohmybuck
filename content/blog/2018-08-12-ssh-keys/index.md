---
title: "SSH Keys"
description: "Create a new Client specific key"
date: 2018-08-12
tags: ["snippet", "ssh"]
---

[Generating a new SSH key]

```bash
cd ~/.ssh/

ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
Enter file in which to save the key (~/.ssh/id_rsa):
  > <client-name>_rsa # eg my-client_rsa

# hit enter twice for no passphrase

cat <client-name>_rsa.pub

# Copy paste the text printed out in
#   the terminal into your "Add a new SSH Key" window
#   in Bitbucket, Github, Gitlab, etc
```

[Add to your SSH Config]

This allows you to have multiple SSH keys configured for multiple clients, and automagically select the correct key when talking to the relevant server.

<!-- References -->

[add to your ssh config]: https://www.digitalocean.com/community/tutorials/how-to-configure-custom-connection-options-for-your-ssh-client
[generating a new ssh key]: https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#generating-a-new-ssh-key

<http://nerderati.com/2011/03/17/simplify-your-life-with-an-ssh-config-file/>
