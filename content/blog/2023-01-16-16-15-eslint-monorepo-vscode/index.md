---
title: Eslint monorepo fix
description: Eslint monorepo fix
date: 2023-01-16 16:15
tags: [eslint, monorepo]
draft: true
---

In monorepos with vscode this is a common error:

`Parsing error: Cannot read file '<root>/tsconfig.json'.`

Fixes usually start with adding:

```js
// <root>\.eslintrc.cjs

module.exports = {
+	root: true,
    ...
	parser: "@typescript-eslint/parser",
	parserOptions: {
        ...
+		tsconfigRootDir: __dirname,
+		project: ["tsconfig.json"],
	},
}
```
To no avail.

The fix is actually a vscode issue. 

Make a new file in the root `.vscode/settings.json`

```json
{
	"eslint.workingDirectories": [{ "mode": "auto" }]
}
```