---
title: Convert Relative to Absolute Paths Nodejs
description: Convert Relative to Absolute Paths Nodejs
date: 2021-08-30 11:20
tags: [node.js, refactoring]
---

```js
const path = require("path")
const replace = require("replace-in-file")

const PREFIX = process.cwd() + path.sep

const optionsFrom = {
  files: [
    path.join(process.cwd(), "src/**/*.{ts,js}"),
    path.join(process.cwd(), "tests/**/*.{ts,js}"),
  ],
  from: /(from ["|'])(\..*)(["|'];$)/gm,
  to: (...args) => {
    const actualfilePath = args.slice(-1)[0]
    const fileDir = args
      .slice(-1)[0]
      .replace(path.sep + path.basename(args.slice(-1)[0]), "")
    const leadFrom = args[1]
    const relPath = args[2]
    const closer = args[3]

    const absolutePath = path.resolve(fileDir, relPath).replace(PREFIX, "")

    return `${leadFrom}${absolutePath}${closer}`
  },
}

const optionsRequire = {
  files: [
    path.join(process.cwd(), "src/**/*.{ts,js}"),
    path.join(process.cwd(), "tests/**/*.{ts,js}"),
  ],
  from: /(require\(["|'])(\..*)(["|']\);$)/gm,
  to: (...args) => {
    const actualfilePath = args.slice(-1)[0]
    const fileDir = args
      .slice(-1)[0]
      .replace(path.sep + path.basename(args.slice(-1)[0]), "")
    const leadFrom = args[1]
    const relPath = args[2]
    const closer = args[3]

    const absolutePath = path.resolve(fileDir, relPath).replace(PREFIX, "")

    return `${leadFrom}${absolutePath}${closer}`
  },
}

const optionsMock = {
  files: [
    path.join(process.cwd(), "src/**/*.{ts,js}"),
    path.join(process.cwd(), "tests/**/*.{ts,js}"),
  ],
  from: /(mock\(["|'])(\..*)(["|'],)/gm,
  to: (...args) => {
    const actualfilePath = args.slice(-1)[0]
    const fileDir = args
      .slice(-1)[0]
      .replace(path.sep + path.basename(args.slice(-1)[0]), "")
    const leadFrom = args[1]
    const relPath = args[2]
    const closer = args[3]

    const absolutePath = path.resolve(fileDir, relPath).replace(PREFIX, "")

    return `${leadFrom}${absolutePath}${closer}`
  },
}

const main = async () => {
  try {
    const resultsFrom = await replace(optionsFrom)
    console.log("Replacement results:", resultsFrom)
    const resultsRequire = await replace(optionsRequire)
    console.log("Replacement results:", resultsRequire)
    const resultsMock = await replace(optionsMock)
    console.log("Replacement results:", resultsMock)

    process.exit(0)
  } catch (error) {
    console.trace(error)
    process.exit(1)
  }
}

main()
```
