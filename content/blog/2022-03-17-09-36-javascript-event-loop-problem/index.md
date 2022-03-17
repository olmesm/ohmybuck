---
title: JavaScript Event Loop Problem
description: JavaScript Event Loop Problem
date: 2022-03-17 09:36
tags: [js]
---

## Problem

```js
function sleep(cb) {
  return new Promise((res) => setTimeout(cb, 1000));
}

(async function main() {
  await sleep(() => console.log("ok", 1));
  console.log("wait", 1);
  await sleep(() => console.log("ok", 2));
  console.log("wait", 2);
  await sleep(() => console.log("ok", 3));
  console.log("wait", 3);
  await sleep(() => console.log("ok", 4));
  console.log("wait", 4);
})()(
  // T:+0 >> Promise {<pending>}
  // T:+1 >> "OK", 1

  function main() {
    sleep(() => console.log("ok", 1));
    console.log("wait", 1);
    sleep(() => console.log("ok", 2));
    console.log("wait", 2);
    sleep(() => console.log("ok", 3));
    console.log("wait", 3);
    sleep(() => console.log("ok", 4));
    console.log("wait", 4);
  }
)();

// T:+0 >> "wait", 1
// T:+0 >> "wait", 2
// T:+0 >> "wait", 3
// T:+0 >> "wait", 4
// T:+1 >> "OK", 1
// T:+1 >> "OK", 2
// T:+1 >> "OK", 3
// T:+1 >> "OK", 4
```

## Explanation

<iframe width="1190" height="669" src="https://www.youtube.com/embed/8aGhZQkoFbQ?t=365" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
