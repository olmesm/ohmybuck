---
title: JavaScript Event Loop Problem
description: JavaScript Event Loop Problem
date: 2022-03-17 09:36
tags: [js]
---

Sample question for async tech testing.

## Problem

```js
function sleep(cb, timeout = 0) {
  return setTimeout(cb, timeout);
}

(function main() {
  try {
    console.log("wait", 1);
    sleep(() => console.log("ok", 1), 1000);
    console.log("wait", 2);
    sleep(() => console.log("ok", 2), 1000);
    console.log("wait", 3);
    sleep(() => console.log("ok", 3), 1000);
    console.log("wait", 4);
    sleep(() => console.log("ok", 4), 1000);
  } catch (e) {
    console.error(e);
  }
})();

// T:+0 >> "wait", 1
// T:+0 >> "wait", 2
// T:+0 >> "wait", 3
// T:+0 >> "wait", 4
// T:+1 >> "ok", 1
// T:+1 >> "ok", 2
// T:+1 >> "ok", 3
// T:+1 >> "ok", 4
```

## Solution

```js
function sleep(cb, timeout = 0) {
  return new Promise((res) =>
    setTimeout(() => {
      res(cb());
    }, timeout)
  );
}

(async function main() {
  try {
    console.log("wait", 1);
    await sleep(() => console.log("ok", 1), 1000);
    console.log("wait", 2);
    await sleep(() => console.log("ok", 2), 1000);
    console.log("wait", 3);
    await sleep(() => console.log("ok", 3), 1000);
    console.log("wait", 4);
    await sleep(() => console.log("ok", 4), 1000);
  } catch (e) {
    console.error(e);
  }
})();

// T:+0 >> "wait", 1
// T:+1 >> "ok", 1
// T:+1 >> "wait", 2
// T:+2 >> "ok", 2
// T:+2 >> "wait", 3
// T:+3 >> "ok", 3
// T:+3 >> "wait", 4
// T:+4 >> "ok", 4
```

## Additional

<iframe width="1190" height="669" src="https://www.youtube.com/embed/8aGhZQkoFbQ?t=365" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
