---
title: "Console logging tricks in es6"
description: "Description"
date: 2018-09-05
tags: ["node","es6", "javascript", "snippet"]
---

# Console logging tricks in es6…

## Easier tracing?

```js
// eg:
console.log(x);

// Solution: Wrap in object syntax
console.log({ x });

// #=> { x: .... }
```

## Arrow function?

```js
// eg:
x => someFunction(x);

// Solution: Due to console.log always returning undefined, we can throw a logical operator after it to return our original function
x => console.log(x) || someFunction(x);
// or as above
x => console.log({ x }) || someFunction(x);
```
