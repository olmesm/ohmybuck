---
title: Setting Up Your Mac
description: Setting Up Your Mac
date: 2020-06-08 09:41
tags: ["mac", "development"]
---

My "opinionated" guide to mac setup with a focus on enhancing existing/normal workflows. Tooling and setup has a focus on ease of setup and keeping an experience that isn't too far from OS defaults.

## Concepts

- Create an environment which is not bound to any runtime (use asdf)
- Use mac defaults as much as possible
- Rely on package managers as much as possible (homebrew and asdf)
- Easy, quick, and replicatable setup

1. Install Homebrew

   [From Homebrew](https://brew.sh/) - make sure to follow any additional instructions in the console.

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

1. Install git, ZSH tools, and shell completions

   ```bash
   brew install wget zsh-completions git vim \
     && brew install --cask iterm2
   ```

1. Setup git

   ```bash
   git config --global user.name "... ..."
   git config --global user.email "...@..."
   git config --global pull.rebase false
   git config --global init.defaultBranch main
   ```

1. Change permissions for zsh directory

   ```bash
   sudo chmod -R g-w,o-w /usr/local/share/zsh 2>/dev/null
   ```

1. Install [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh)

   ```bash
   sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
   ```

1. Install and apply keybindings for iterm

   ```bash
   mkdir iterm-settings && curl -s https://raw.githubusercontent.com/olmesm/setup-mac/master/iterm-keybindings/com.googlecode.iterm2.plist | sed -e 's|%%HOME%%|'"${HOME}"'|g' > ~/iterm-settings/com.googlecode.iterm2.plist
   ```

   - Open iTerm2
   - Open iTerm2 > Preferences or "⌘" + ","
   - Preferences > Load preferences from a custom folder or URL
   - Check and set to ~/iterm-settings

1) Change oh-my-zsh to include full path

   ```bash
   ZSH_THEME=~/.oh-my-zsh/themes/ollyrussell.zsh-theme

   cp ~/.oh-my-zsh/themes/robbyrussell.zsh-theme $ZSH_THEME
   find $ZSH_THEME -type f -exec sed -i '' -e 's|%c%|%~%|g' {} \;
   find ~/.zshrc -type f -exec sed -i '' -e 's|ZSH_THEME="robbyrussell"|ZSH_THEME="ollyrussell"|g' {} \;
   ```

1) Install [asdf](https://asdf-vm.com/#/core-manage-asdf) for runtime management.

   ```bash
   git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.8.0
   find ~/.zshrc -type f -exec sed -i '' -e 's|plugins=(|plugins=(asdf |g' {} \;
   ```

1) Setup node with asdf

   ```bash
   brew install gnupg
   asdf plugin-add nodejs

   echo "
   # Disable asdf nodejs signature check
    NODEJS_CHECK_SIGNATURES=no\n" >> ~/.zshrc
   echo "legacy_version_file = yes" > ~/.asdfrc
   echo "yarn" > ~/.default-npm-packages

   asdf install nodejs latest
   ```

1) Install recommended packages (feel free to delete as required)

   | Application        | brew info link                                   |
   | ------------------ | ------------------------------------------------ |
   | Boostnote          | https://formulae.brew.sh/cask/boostnote          |
   | Chromium           | https://formulae.brew.sh/cask/chromium           |
   | Cyberduck          | https://formulae.brew.sh/cask/cyberduck          |
   | Docker             | https://formulae.brew.sh/cask/docker             |
   | Firefox            | https://formulae.brew.sh/cask/firefox            |
   | Google Chrome      | https://formulae.brew.sh/cask/google-chrome      |
   | Intellij Idea      | https://formulae.brew.sh/cask/intellij-idea      |
   | Itsycal            | https://formulae.brew.sh/cask/itsycal            |
   | Libreoffice        | https://formulae.brew.sh/cask/libreoffice        |
   | Ngrok              | https://formulae.brew.sh/cask/ngrok              |
   | Opera              | https://formulae.brew.sh/cask/opera              |
   | Postman            | https://formulae.brew.sh/cask/postman            |
   | Rectangle          | https://formulae.brew.sh/cask/rectangle          |
   | Slack              | https://formulae.brew.sh/cask/slack              |
   | Transmission       | https://formulae.brew.sh/cask/transmission       |
   | Visual Studio Code | https://formulae.brew.sh/cask/visual-studio-code |
   | VLC                | https://formulae.brew.sh/cask/vlc                |
   | Whatsapp           | https://formulae.brew.sh/cask/whatsapp           |

   ```bash
   brew install --cask \
   boostnote \
   chromium \
   cyberduck \
   docker \
   firefox \
   google-chrome \
   intellij-idea \
   itsycal \
   libreoffice \
   ngrok \
   opera \
   postman \
   rectangle \
   slack \
   switchhosts \
   transmission \
   visual-studio-code \
   vlc \
   whatsapp
   ```

   Note you'll need to [approve most of the above apps from unidentified developers](https://support.apple.com/en-gb/guide/mac-help/mh40616/mac)

1. Create a `projects` and `personal` directory

   ```bash
   mkdir \
    -p ~/projects/prototypes \
    ~/personal
   ```

   | Directory | Description                    | Structure                                 |
   | --------- | ------------------------------ | ----------------------------------------- |
   | projects  | Client work and prototypes     | projects/&lt;client&gt;/&lt;code-repo&gt; |
   | personal  | Personal and non-company work. | personal/&lt;code-repo&gt;                |

1. Add `projects` and `personal` to your favourites

   ```bash
   open ~
   ```

   - Drag and drop the `projects` and `personal` directories into the left hand favourites pane of the finder window.

1. For a quickly accessible calandar and clock, setup itsycal (depends on `itsycal` being installed as above)

   - Open itsycal
   - Open Preferences or "⌘" + ","
   - General > Launch at login
   - Preferences > Appearance > `E d MMM`

1. Install [Lastpass in the browser](https://lastpass.com/misc_download2.php)

1. Setup [Authy](https://apps.apple.com/us/app/authy/id494168017) on your mobile device for MFA - do not install this on your laptop.

1. Setup [Lastpass](https://apps.apple.com/gb/app/lastpass-password-manager/id324613447) on your mobile device.

1. Setup [Slack](https://apps.apple.com/gb/app/slack/id618783545) on your mobile device.
