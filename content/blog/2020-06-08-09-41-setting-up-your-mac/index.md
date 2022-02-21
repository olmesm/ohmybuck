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

---

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

1. Install [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh)

   ```bash
   sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
   ```

1. Close all all terminals and open iterm

1. Apply keybindings for iterm and increase window memory

   - Open iTerm2
   - Open iTerm2 > Preferences or "⌘" + ","
   - Profiles > Terminal > Scrollback Lines: 10,000
   - Profiles > Keys > Key Mappings > Presets > Natural Text Editing > "Remove"

1) Change oh-my-zsh to include full path

   ```bash
   ZSH_THEME=~/.oh-my-zsh/themes/ollyrussell.zsh-theme

   cp ~/.oh-my-zsh/themes/robbyrussell.zsh-theme $ZSH_THEME
   find $ZSH_THEME -type f -exec sed -i '' -e 's|%c%|%~%|g' {} \;
   find ~/.zshrc -type f -exec sed -i '' -e 's|ZSH_THEME="robbyrussell"|ZSH_THEME="ollyrussell"|g' {} \;
   ```

1) Setup node with [asdf](https://asdf-vm.com/#/core-manage-asdf) for runtime management.

   ```bash
   brew install gnupg asdf
   find ~/.zshrc -type f -exec sed -i '' -e 's|plugins=(|plugins=(asdf |g' {} \; # Add asdf-vm shell completions
   . ~/.zshrc # Source the new additions
   asdf plugin-add nodejs # Add nodejs

   echo "
   # Disable asdf nodejs signature check
    NODEJS_CHECK_SIGNATURES=no\n" >> ~/.zshrc
   echo "legacy_version_file = yes" > ~/.asdfrc
   echo "yarn" > ~/.default-npm-packages

   asdf install nodejs lts
   asdf global nodejs $(asdf list nodejs | grep -e "\d.*" | tail -1)
   ```

1) Install recommended packages (feel free to delete as required)

   | Application        | brew info link                                   |
   | ------------------ | ------------------------------------------------ |
   | Boostnote | https://formulae.brew.sh/cask/boostnote |
   | Chromium | https://formulae.brew.sh/cask/chromium |
   | Cyberduck | https://formulae.brew.sh/cask/cyberduck |
   | Docker | https://formulae.brew.sh/cask/docker |
   | Firefox | https://formulae.brew.sh/cask/firefox |
   | Google-chrome | https://formulae.brew.sh/cask/google-chrome |
   | Itsycal | https://formulae.brew.sh/cask/itsycal |
   | Libreoffice | https://formulae.brew.sh/cask/libreoffice |
   | Ngrok | https://formulae.brew.sh/cask/ngrok |
   | Obsidian | https://formulae.brew.sh/cask/obsidian |
   | Opera | https://formulae.brew.sh/cask/opera |
   | Postwoman | https://formulae.brew.sh/cask/postwoman |
   | Rectangle | https://formulae.brew.sh/cask/rectangle |
   | Slack | https://formulae.brew.sh/cask/slack |
   | Switchhosts | https://formulae.brew.sh/cask/switchhosts |
   | Transmission | https://formulae.brew.sh/cask/transmission |
   | Visual Studio Code | https://formulae.brew.sh/cask/visual-studio-code |
   | VLC | https://formulae.brew.sh/cask/vlc |

   ```bash
    brew install --cask \
      boostnote \
      chromium \
      cyberduck \
      docker \
      firefox \
      google-chrome \
      itsycal \
      libreoffice \
      ngrok \
      obsidian \
      opera \
      postwoman \
      rectangle \
      slack \
      switchhosts \
      transmission \
      visual-studio-code \
      vlc
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

1. For a quickly accessible calendar and clock, setup itsycal (depends on `itsycal` being installed as above)

   - Open itsycal
   - Open Preferences or "⌘" + ","
   - General > Launch at login
   - Preferences > Appearance > `E d MMM`
   - Hide icon
   - Hide the system date

1. Install [Lastpass in the browser](https://lastpass.com/misc_download2.php)

1. Setup [Authy](https://apps.apple.com/us/app/authy/id494168017) on your mobile device for MFA - do not install this on your laptop.

1. Setup [Lastpass](https://apps.apple.com/gb/app/lastpass-password-manager/id324613447) on your mobile device.

1. Setup [Slack](https://apps.apple.com/gb/app/slack/id618783545) on your mobile device.
