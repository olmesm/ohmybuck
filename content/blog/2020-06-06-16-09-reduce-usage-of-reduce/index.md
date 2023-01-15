---
title: Reduce Usage Of Reduce
description: Reduce Usage Of Reduce
date: 2020-06-06 16:09
tags: ["javascript", "functional programming"]
---

When it comes to concatenating strings, the reduce method is a common choice. However, I recently came across a [Twitter thread](https://twitter.com/jaffathecake/status/1213077702300852224) discussing an [ESLint error](https://github.com/sindresorhus/eslint-plugin-unicorn/issues/623) that flagged up when using reduce in this way.

After considering the points made in the thread, I decided to refactor a piece of code that I had been using reduce for string concatenation. The refactored version is arguably more readable and understandable for others.

Here is an example of the original code:

```js
const stringMessageFromObject = (object) => {
  const reducer = (acc, curr) => acc + `${curr}: ${object[curr]}\n`;
  return Object.keys(object).reduce(reducer, "");
};
```

And here is the refactored version:

```js
const stringMessageFromObject = (object) =>
  Object.keys(object)
    .map((curr) => `${curr}: ${object[curr]}\n`)
    .join("");
```

By using map and join methods, we can achieve the same concatenation of strings in a more clear and concise way.
