---
title: "Identity Error"
description: "kinda result types"
date: 2026-11-01
tags: ["javascript", "typescript"]
---

We can have a very simple alternative to a result type or attempt wrappers eg [attempt from es-toolkit](https://es-toolkit.dev/reference/util/attempt.html)

```
import { attempt } from 'es-toolkit/util';

// Success case
const [error, result] = attempt(() => 42);
// error is null, result is 42

// Error case
const [error, result] = attempt(() => {
  throw new Error('Something went wrong');
});
// error is an Error object, result is null
```

`identityError` as the alternative

```typescript
const identityError = (e: Error) => e

const somePromise = () => Promise.resolve(42)

async function main() {
	// number | Error
	const res = await somePromise().catch(identityError)

  if (res instanceof Error) {
    // exit condition
    return
  }

  // number
  res
}
```

Pushing a little further we can also type the catch:

```typescript
const identityError = (e: Error) => e

class CustomError extends Error {}

const maybeGetNumber = () => {
    if (Math.random() > 0.5) throw new CustomError()
    
    return Promise.resolve(42)
}

async function doubler() {
	// number | CustomError
    const maybeNumber = await maybeGetNumber().catch<CustomError>(identityError)

    if (maybeNumber instanceof Error) {
        // exit condition
        return 0
    }

    // number
    return maybeNumber * 2
}
```
