---
title: Promise Arrays and Why It’s Important to Keep Tracking Them
description: Promise Arrays and Why It’s Important to Keep Tracking Them
date: 2021-07-26 14:44
tags: [promises, js, javascript]
---

I was battling to explain how difficult error handling can be when inside a promise array - here’s a fun example for either a tech test or workshop.

```js
const someAsyncFunction = () => {
  const text = "still running"
  console.log(text)
  Promise.reject(text)
}

Promise.all([someAsyncFunction].map(fn => fn()))
  .then(console.log)
  .catch(console.log)
```

The solution

```js
const someAsyncFunction = () => {
  const text = "still running"
  console.log(text)
  return Promise.reject(text) // we're now returning the promise.
}

Promise.all([someAsyncFunction].map(fn => fn()))
  .then(console.log)
  .catch(console.log)
```

[Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#using_promise.allsettled) is also worth considering.
