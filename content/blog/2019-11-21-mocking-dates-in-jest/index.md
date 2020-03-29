---
title: "Mocking dates in jest"
description: "Mocking dates in jest"
date: 2019-11-21
tags: ["mocking dates", "jest", "javascript"]
---

```js
new Date(Date.now());

const dateSpy = jest.spy(Date, "now");
```

Credit to [Hugo's post](https://codewithhugo.com/mocking-the-current-date-in-jest-tests/)
