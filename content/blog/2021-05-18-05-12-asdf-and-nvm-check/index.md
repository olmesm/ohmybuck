---
title: Asdf and Nvm Check
description: Compare nvm and asdf node versions
date: 2021-05-18 05:12
tags: [nvm, asdf, devops, tooling]
---

Compares the node versions set in both nvm and asdf configs.

```js
#! /usr/bin/env node
const fs = require("fs")

const NVM_FILE = ".nvmrc"
const ASDF_FILE = ".tool-versions"

const nvmFile = fs.readFileSync(NVM_FILE, "utf-8")
const asdfFile = fs.readFileSync(ASDF_FILE, "utf-8")

const capture = (str, exp, group = 1) => {
  exp = typeof exp === "string" ? new RegExp(exp) : exp
  const res = str.match(exp)

  if (res[group]) {
    return res[group]
  }

  return undefined
}

const main = async () => {
  try {
    const nvmVersion = capture(nvmFile, /([0-9\.]+)/)
    const asdfVersion = capture(asdfFile, /nodejs ([0-9\.]+)/)

    if (nvmVersion !== asdfVersion) {
      throw new Error(
        `${NVM_FILE} version: ${nvmVersion} does not appear to match ${ASDF_FILE} version: ${asdfVersion}`
      )
    }

    process.exit(0)
  } catch (error) {
    console.trace(error)
    process.exit(1)
  }
}

module.exports = main()
```

## Quick Setup

Assumes script location `scripts/node-tooling-check.js`

```bash
npm install -D husky

echo '{
    "hooks": {
      "pre-push": "node scripts/node-tooling-check.js"
  }
}
' > .huskyrc
```
