---
title: Node Current Directory
description: Node Current Directory
date: 2020-04-27-09-02
tags: ["node"]
---

Working with the following directory structure

```bash
.
├── package.json
├── scripts
│   └── new-post
│       ├── index.js
│       └── post.md.tpl
└── static
    ├── CNAME
    ├── favicon.ico
    └── robots.txt
```

Running the hypothetical script `node scripts/new-post/index.js` will produce the following

```js
process.cwd()
// .

__dirname
// scripts/new-post
```
