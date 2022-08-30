---
title: "Shell aliases"
date: 2021-08-19 06:46
tags: [git]
---

```bash
function gitcp(){
    echo "Running...

    git add . && git commit -m '$1' && git push
"

    sleep 1.5

    git add . && git commit -m "$1" && git push
}

# Make a directory and cd straight into it
# https://unix.stackexchange.com/questions/125385/combined-mkdir-and-cd
mkcd ()
{
    mkdir -p -- "$1" &&
      cd -P -- "$1" && clear
}

touchfile () {
    local file="$1"
    mkdir -p -- "$(dirname -- "$file")" &&
        touch -- "$file"
}

# Start writing a note in the terminal
alias no='cd ~/notes/; vim "$(date +"%Y-%m-%d@%H-%M-%S-%A").md"'

# Generate random string
alias randstr="cat /dev/urandom | env LC_ALL=C tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1"
```
