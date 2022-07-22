---
title: TypeScript Generic Type Assertions
description: TypeScript Generic Type Assertions
date: 2022-07-15 11:02
tags: [TODO]
draft: true
---

```ts
const transformtoString = (something: unknown) => {
  return `Transformed => ${something}`;
};

const genericApplicator = <K extends Function, T>(
  func: K,
  unknownObject: T | T[]
) => {
  if (Array.isArray(unknownObject)) {
    return unknownObject.map((item) => func(item));
  }

  return func(unknownObject);
};

genericApplicator(transformtoString, [1, 2, 3]);
```
