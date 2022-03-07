---
title: Setting Up Your Mac
description: Setting Up Your Mac
date: 2020-06-08 09:41
tags: ["mac", "development"]
---

A guide to mac setup with a focus on enhancing existing/normal workflows. Tooling and setup has a focus on ease of setup and keeping an experience that isn't too far from OS defaults. This could potentially be scripted, but has been left as a set of manual tasks so that engineers can pick, choose, and understand what they're doing.

## What this means

- **Do not** install Google Chrome or Slack via website installers.
- **Do not** install database engines via homebrew or website installers.
- **Do not** install Node.js, Python, Ruby, Terraform, Postgres, etc via homebrew or website installers.
- **Do** rely on package managers as much as possible (using homebrew and asdf).
- **Do** create an environment which is not bound to any runtime (using asdf).
- **Do** create an easy, quick, and replicatable setup.
- **Do** use mac defaults as much as possible.

Professional engineers need to ensure a consistent system for development and running applications. Running systems often use containers for ensuring consistency, but for local development containers and virtualisation isn't always a desired or efficient option.

Tools like [Homebrew] for desktop and terminal applications and [asdf] for managing runtimes, enables professionals this consistency and reproducibility.

### [asdf]

> Manage multiple runtime versions with a single CLI tool, extendable via plugins - docs at asdf-vm.com. asdf is a CLI tool that can manage multiple language runtime versions on a per-project basis. It is like gvm, nvm, rbenv & pyenv (and more) all in one! Simply install your language's plugin!

- [Available plugins](https://github.com/asdf-vm/asdf-plugins#plugin-list)
- [Why use asdf?](https://github.com/asdf-vm/asdf#why-use-asdf)

### [Homebrew]

> Homebrew is the easiest and most flexible way to install the UNIX tools Apple didn’t include with macOS. It can also install software not packaged for your Linux distribution to your home directory without requiring sudo.

- [Available Casks](https://formulae.brew.sh/cask/)
- [Available Formulaes](https://formulae.brew.sh/formula/)
- [Homebrew Documentation](https://docs.brew.sh/Manpage)

**As a general rule of thumb, if available in [asdf] and [homebrew] prefer to install package from [asdf]**. Database engines should be run locally via Docker.

---

1. Install Homebrew

   From [Homebrew] - make sure to follow any additional instructions in the console.

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

1. Add to profile

   ```bash
   echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
   eval "$(/opt/homebrew/bin/brew shellenv)"
   ```

1. Install git, ZSH tools, and shell completions

   ```bash
   brew install wget zsh-completions git vim \
     && brew install --cask iterm2
   ```

1. Setup git

   It is fine to use your personal github, but use your company email and [link it to your account](https://github.com/settings/emails).

   ```bash
   git config --global user.name "... ..."
   git config --global user.email "...@..."
   git config --global pull.rebase false
   git config --global init.defaultBranch main
   ```

1. Setup Rosetta

   This is for compatibility of existing x86 applications with the M1 chipset.

   ```bash
   if [[ `sysctl -n machdep.cpu.brand_string` == 'Apple M1' ]]; then
   # Mac M1's different arch workaround.
     softwareupdate --install-rosetta
   fi
   ```

1. Install [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh)

   Allows installing plugins for zsh terminals such as type completion.

   ```bash
   sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
   ```

1. Close all all terminals and open iterm

   [Iterm is more feature rich](https://iterm2.com/features.html) than the standard mac terminal app.

1. Apply keybindings for iterm and increase window memory

   - Open iTerm2
   - Open iTerm2 > Preferences or "⌘" + ","
   - Profiles > Terminal > Scrollback Lines: 10,000
     ![](/images/screenshot_2022_02_21_at_11_13_49.png)

   - Profiles > Keys > Key Mappings > Presets > Natural Text Editing > "Remove"
     ![](/images/screenshot_2022_02_21_at_11_14_04.png)

1) Change oh-my-zsh to include full path

   Default oh-my-zsh would show the directory `/usr/my-name/projects/client/app` path as `app`. The below will backup the default themeand then setup to show the path as `~/projects/client/app`.

   ```bash
   ZSH_THEME=~/.oh-my-zsh/themes/ollyrussell.zsh-theme

   cp ~/.oh-my-zsh/themes/robbyrussell.zsh-theme $ZSH_THEME
   find $ZSH_THEME -type f -exec sed -i '' -e 's|%c%|%~%|g' {} \;
   find ~/.zshrc -type f -exec sed -i '' -e 's|ZSH_THEME="robbyrussell"|ZSH_THEME="ollyrussell"|g' {} \;
   ```

1) Setup node with [asdf] for runtime management.

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
   | Boostnote          | https://formulae.brew.sh/cask/boostnote          |
   | Chromium           | https://formulae.brew.sh/cask/chromium           |
   | Cyberduck          | https://formulae.brew.sh/cask/cyberduck          |
   | Docker             | https://formulae.brew.sh/cask/docker             |
   | Firefox            | https://formulae.brew.sh/cask/firefox            |
   | Google-chrome      | https://formulae.brew.sh/cask/google-chrome      |
   | Itsycal            | https://formulae.brew.sh/cask/itsycal            |
   | Libreoffice        | https://formulae.brew.sh/cask/libreoffice        |
   | Ngrok              | https://formulae.brew.sh/cask/ngrok              |
   | Obsidian           | https://formulae.brew.sh/cask/obsidian           |
   | Opera              | https://formulae.brew.sh/cask/opera              |
   | Postman            | https://formulae.brew.sh/cask/postman            |
   | Rectangle          | https://formulae.brew.sh/cask/rectangle          |
   | Slack              | https://formulae.brew.sh/cask/slack              |
   | Switchhosts        | https://formulae.brew.sh/cask/switchhosts        |
   | Transmission       | https://formulae.brew.sh/cask/transmission       |
   | Visual Studio Code | https://formulae.brew.sh/cask/visual-studio-code |
   | VLC                | https://formulae.brew.sh/cask/vlc                |

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
      postman \
      rectangle \
      slack \
      switchhosts \
      transmission \
      visual-studio-code \
      vlc
   ```

   Note you'll need to [approve most of the above apps from unidentified developers](https://support.apple.com/en-gb/guide/mac-help/mh40616/mac)

1. Create a `projects` and `personal` directory

   This allows us to pair and reason about each others systems easily.

   ```bash
   mkdir \
    -p ~/projects/prototypes \
    ~/personal
   ```

   | Directory | Description                    | Structure                                                          |
   | --------- | ------------------------------ | ------------------------------------------------------------------ |
   | projects  | Client work and prototypes     | projects/&lt;github organisation/client name&gt;/&lt;code-repo&gt; |
   | personal  | Personal and non-company work. | personal/&lt;code-repo&gt;                                         |

   The repo [radically-digital/prismic-circleci-webhook](https://github.com/radically-digital/prismic-circleci-webhook) would be `~/projects/radically-digital/prismic-circleci-webhook` in all employee systems.

   The repo [olmesm/ohmybuck](https://github.com/olmesm/ohmybuck) would be `~/personal/ohmybuck` in my system.

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
     ![](/images/screenshot_2022_02_21_at_11_39_25.png)

1. Install [Lastpass in the browser](https://lastpass.com/misc_download2.php)

1. Setup [Authy](https://apps.apple.com/us/app/authy/id494168017) on your mobile device for MFA - do not install this on your laptop.

1. Setup [Lastpass](https://apps.apple.com/gb/app/lastpass-password-manager/id324613447) on your mobile device.

1. Setup [Slack](https://apps.apple.com/gb/app/slack/id618783545) on your mobile device.

<!-- MARKDOWN REFS -->

[asdf]: https://asdf-vm.com
[homebrew]: https://brew.sh
