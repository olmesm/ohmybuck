---
title: "Build a React Website with full CI/CD in less than 2 minutes"
description: "Hurry! Hurry!"
date: 2018-08-12T13:14:11Z
tags: ["gitlab", "react"]
---

I'm going to show you how to deploy a static React website in under 2 minutes, with full CI/CD, onto the WWW.

You'll be using:

- React
- Gilab pages
- Gitlab CI/CD

A few assumptions:

- You have git setup
- You have a Gitlab account (with [SSH setup for Gitlab])
- You don't have a repo on gitlab called `my-awesome-app`. If so, then use a different name below.
- You have Node installed (hopefully via [nvm])

## Ready?

Start the time!

Let's create a new React App using [Create React App]

```bash
# Using npx - create a react app!
npx create-react-app my-awesome-app

# Go into the app directory
cd my-awesome-app

# Add ci configuration
touch .gitlab-ci.yml

# Using your favourite editor - mine being vscode
code .gitlab-ci.yml
```

Copy the following into the `.gitlab-ci.yml` file.

```yaml
# Using the node alpine image to build the React app
image: node:alpine

# Announce the URL as per CRA docs
# https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#advanced-configuration
variables:
  PUBLIC_URL: /my-awesome-app
# Cache node modules - speeds up future builds
cache:
  paths:
    - node_modules

# Name the stages involved in the pipeline
stages:
  - deploy

# Job name for gitlab to recognise this results in assets for Gitlab Pages
# https://docs.gitlab.com/ee/user/project/pages/introduction.html#gitlab-pages-requirements
pages:
  stage: deploy
  script:
    - npm install # Install all dependencies
    - npm run build --prod # Build for prod
    - mv public _public # CRA and gitlab pages both use the public folder. This is only for the build pipeline.
    - mv build public # Move build files to public dir for Gitlab Pages
    - cp public/index.html public/404.html # Helps with https://medium.com/@pshrmn/demystifying-single-page-applications-3068d0555d46
  artifacts:
    paths:
      - public # The built files for Gitlab Pages to serve
  only:
    - master # Only run on master branch
```

All ready - let's push it up to Gitlab to build and deploy.

```bash
# Initialize the repo
git init

# Stage all the files for commit
git add .

# Commit the files
git commit -m 'first commit!'

# Push up to gitlab
git push --set-upstream git@gitlab.com:<YOUR_GITLAB_USERNAME>/$(git rev-parse --show-toplevel | xargs basename).git $(git rev-parse --abbrev-ref HEAD)
```

Now visit <https://gitlab.com/YOUR_GITLAB_USERNAME/my-awesome-app/pipelines>

Once that passes checkout <https://YOUR_GITLAB_USERNAME.gitlab.io/my-awesome-app>.

Done!

<!-- References -->

[nvm]: https://github.com/creationix/nvm
[create react app]: https://github.com/facebook/create-react-app
[ssh setup for gitlab]: https://docs.gitlab.com/ee/ssh/
