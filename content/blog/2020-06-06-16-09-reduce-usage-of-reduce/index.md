---
title: Reduce Usage Of Reduce
description: Reduce Usage Of Reduce
date: 2020-06-06 16:09
tags: ["javascript", "functional programming"]
---

I’ve been using reduce loads for string concat but came across [this twitter thread](https://twitter.com/jaffathecake/status/1213077702300852224) when an [XO error flagged up](https://github.com/sindresorhus/eslint-plugin-unicorn/issues/623)

I’ve now just refac’d a piece of code which has arguably made it way more understandable to others.

```js
// from this...
const stringMessageFromObject = object => {
  const reducer = (acc, curr) => acc + `${curr}: ${object[curr]}\n`
  return Object.keys(object).reduce(reducer, "")
}

// to this...
const stringMessageFromObject = object =>
  Object.keys(object)
    .map(curr => `${curr}: ${object[curr]}\n`)
    .join("")
```
