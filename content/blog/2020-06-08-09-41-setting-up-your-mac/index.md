---
title: Setting Up Your Mac
description: Setting Up Your Mac
date: 2020-06-08 09:41
tags: ["mac", "development"]
---

My somewhat opinionated guide to mac setup with a focus on enhancing existing/normal workflows. Tooling and setup has a focus on ease of setup and keeping an experience that isn't too far from OS defaults.

1. [Install homebrew](https://brew.sh/)
1. Install git, ZSH, and shell completions

   ```bash
   brew install wget zsh zsh-completions git vim && brew cask install iterm2
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

1. Change default login shell for user

   ```bash
   chsh -s /bin/zsh
   ```

1. Change permissions for zsh directory

   ```bash
   sudo chmod -R g-w,o-w /usr/local/share/zsh
   ```

1. Change oh-my-zsh to include full path

   ```bash
   ZSH_THEME=~/.oh-my-zsh/themes/ollyrussell.zsh-theme

   cp ~/.oh-my-zsh/themes/robbyrussell.zsh-theme $ZSH_THEME
   find $ZSH_THEME -type f -exec sed -i '' -e 's|%c%|%~%|g' {} \;
   find ~/.zshrc -type f -exec sed -i '' -e 's|ZSH_THEME="robbyrussell"|ZSH_THEME="ollyrussell"|g' {} \;
   ```

1. Install runtimes as required

   - Java: [sdkman](https://sdkman.io/install)
   - Node: [nvm](https://github.com/nvm-sh/nvm)
   - Python: [pipenv](https://github.com/pypa/pipenv)
   - Ruby: [rvm](https://rvm.io/)
   - Rust: [Rustup](https://www.rust-lang.org/tools/install)
   - Terraform: [tfenv](https://github.com/tfutils/tfenv)

1. Install recommended packages (feel free to delete as required)

   ```bash
   brew cask install \
    boostnote \
    chromium \
    cyberduck \
    docker \
    firefox \
    itsycal \
    keybase \
    libreoffice \
    ngrok \
    opera \
    postman \
    slack \
    transmission \
    virtualbox \
    visual-studio-code \
    vlc \
    whatsapp \
    google-chrome
   ```

   Note you'll need to [approve most of the above apps from unidentified developers](https://support.apple.com/en-gb/guide/mac-help/mh40616/mac)

1. Create a `projects` and `personal` directory

   ```bash
   mkdir \
    -p ~/projects/prototypes \
    ~/personal
   ```

   | Directory | Description                                                       | Structure                                 |
   | --------- | ----------------------------------------------------------------- | ----------------------------------------- |
   | projects  | Client work and prototypes                                        | projects/&lt;client&gt;/&lt;code-repo&gt; |
   | personal  | Personal and non-company work. Ethically OK to take when leaving. | personal/&lt;code-repo&gt;                |

1. Add `projects` and `personal` to your favourites

   ```bash
   open ~
   ```

   - Drag and drop the `projects` and `personal` directories into the left hand favourites pane of the finder window.

1. For managing multiple calendars, install [Woven](https://woven.com/)

1. For ubuntu-like window snapping, install [Magnet](https://apps.apple.com/gb/app/magnet/id441258766)

1. For a quickly accessible calandar and clock, setup itsycal (depends on `brew cask install itsycal` as above)

   - Open itsycal
   - Open Preferences or "⌘" + ","
   - General > Launch at login
   - Preferences > Appearance > `h:mma E d MMM`

1. Install [Lastpass in the browser](https://lastpass.com/misc_download2.php)

1. Setup [Authy](https://apps.apple.com/us/app/authy/id494168017) on your mobile device for MFA - do not install this on your laptop.

1. Setup [Lastpass](https://apps.apple.com/gb/app/lastpass-password-manager/id324613447) on your mobile device.

1. Setup [Woven](https://apps.apple.com/us/app/woven-calendar/id1439635218) on your mobile device.

1. Setup [Slack](https://apps.apple.com/gb/app/slack/id618783545) on your mobile device.
