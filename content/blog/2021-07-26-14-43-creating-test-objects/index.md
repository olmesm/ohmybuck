---
title: Creating Test Objects
description: Creating Test Objects
date: 2021-07-26 14:43
tags: [JS, lodash, javascript]
---

```js
const { set, cloneDeep } = require("lodash")

const exampleObject = { a: { b: 1 }, c: [{ x: 2 }, { y: 3 }] }

const objForTest1 = set(cloneDeep(exampleObject), "c[0].x", 4) // { a: { b: 1 }, c: [{ x: 4 }, { y: 3 }] }

const objForTest2 = [
  { address: "c[0].x", value: 4 },
  { address: "a", value: 5 },
].reduce(
  (currentObject, setObject) =>
    set(currentObject, setObject.address, setObject.value),
  cloneDeep(exampleObject)
) // { a: 5, c: [{ x: 4 }, { y: 3 }] }

let x = {}

const objForTest3 = set(x, "c[0].x", 4) // { c: [{ x: 4 }] }

console.log(JSON.stringify({ objForTest1, objForTest2, objForTest3 }))
```
