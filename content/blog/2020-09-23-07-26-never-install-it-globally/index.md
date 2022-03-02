---
title: Never Install It Globally
description: Never Install It Globally
date: 2020-09-23 07:26
tags: [Node, javascript, devops]
---

You’re sometimes asked to install node packages globally, but this is dangerous and leads to unlisted project dependencies and over-documentation.

If the project requires the package, it should be listed as a dependency. With respect to node, in your `devDependencies`.

![Gatsby prompts for global installation](/images/install-the-gatsby-cli.png)

To ensure all team members have the same running version and there are no mismatches, or additional installation steps in setting up a project, I've done this in the past.

## Solution 1

Use npx

```bash
npx gatsby-cli <command>
```

**Notes:**

- requires a verision of npm that supports npx
- doesn't install the package as a dependency, this is sometimes a desired outcome - think of initially setting a project up, or always wanting to stay on the latest release.

## Solution 2

Use yarn

```bash
# The only package we can/should install globally
npm install -g yarn
```

```bash
yarn add --save-dev gatsby-cli && yarn gatsby-cli <command>
```

**Notes:**

- requires the package as a dependency
- requires yarn to be installed
- sometimes works with the package name as the command, sometimes it requires the binary name.

## Solution 3

Use the node binary directly.

```bash
npm install --save-dev gatsby-cli && $(npm bin)/gatsby <command>
```

**Notes:**

- requires the package as a dependency
- `$(npm bin)` refers to scripts located in the locally installed node modules - `./node_modules/.bin`.
- you'll need the trailing slash `$(npm bin)/`

## Solution 4

Add the package as a script.

```bash
npm install --save-dev gatsby-cli
#   add to your package.json {"scripts": { "gatsby": "gatsby-cli" }}
#   subsequently
npm run gatsby <command>
```

**Notes:**

- requires the package as a dependency
- Some scripts will require a `--` to ensure the arguments are passed into the shell. eg `npm run gatsby -- new project`
