---
title: Deep Addressing with Lodash
description: Deep Addressing with Lodash
date: 2021-05-23 20:01
tags: [deep addressing, lodash, javascript]
---

This is not efficient but can be used to address objects deep in data structures.

```js
const get = require("lodash/get")
const cloneDeep = require("lodash/cloneDeep")
const set = require("lodash/set")

const setNested = (data, dataPath, cb, shouldCreate = false) =>
  _setNested(cloneDeep(data), dataPath, cb, shouldCreate)

const _setNested = (data, dataPath, cb, shouldCreate = false) => {
  if (dataPath.includes("+")) {
    const [first, ...rest] = dataPath.split(/\.*\+\.*/)

    if (first === "") {
      return data.map(item =>
        setNested(item, rest.join(".+."), cb, shouldCreate)
      )
    }

    const vals = get(data, first)

    if (!Array.isArray(vals)) {
      return data
    }

    return set(
      data,
      first,
      vals.map(item => setNested(item, rest.join(".+."), cb, shouldCreate))
    )
  }

  if (dataPath === "") {
    if (cb instanceof Function) {
      return cb(data)
    }

    return cb
  }

  const val = get(data, dataPath)

  if (typeof val === "undefined" && !shouldCreate) {
    return data
  }

  if (cb instanceof Function) {
    return set(data, dataPath, cb(val))
  }

  return set(data, dataPath, cb)
}

exports.setNested = setNested
```

```js
const { setNested } = require("./set-nested")

const simpleObject = { a: { b: { c: 3 } }, x: 2 }
const simpleArrayObject = [{ name: "john" }, { name: "tony" }]
const complexObject = {
  users: [
    { name: "barney", age: 36, active: false },
    { name: "wilma", age: 32, active: false, skills: ["math", "science"] },
    {
      name: "betty",
      age: 37,
      active: false,
      friends: [{ name: "wilma", age: 32 }],
    },
    { name: "fred", age: 40, active: false },
  ],
}

test("allows an update value", () => {
  const result = setNested(complexObject, "users", 1)
  expect(result).toStrictEqual({ users: 1 })
})

test("allows a function", () => {
  const result = setNested(complexObject, "users", () => 2)
  expect(result).toStrictEqual({ users: 2 })
})

test("updates nested addresses", () => {
  const result = setNested(simpleObject, "a.b.c", 6)
  expect(result).toStrictEqual({ a: { b: { c: 6 } }, x: 2 })
})

test("allows a function with callback value", () => {
  const result = setNested({ a: { b: { c: 3 } } }, "a.b.c", val => 2 * val)
  expect(result).toStrictEqual({ a: { b: { c: 6 } } })
})

test("updates nested array addresses", () => {
  const result = setNested(complexObject, "users.+.name", "john")
  expect(result).toStrictEqual({
    users: [
      { name: "john", age: 36, active: false },
      { name: "john", age: 32, active: false, skills: ["math", "science"] },
      {
        name: "john",
        age: 37,
        active: false,
        friends: [{ name: "wilma", age: 32 }],
      },
      { name: "john", age: 40, active: false },
    ],
  })
})

test("doesn't add if update is not set", () => {
  const result = setNested(simpleObject, "users.userName", "john")
  expect(result).toStrictEqual(simpleObject)
  expect(result.users).not.toBeTruthy()
})

test("doesn't add if update is not set", () => {
  const result = setNested(complexObject, "users.+.userName", "john")
  expect(result).toStrictEqual(complexObject)
})

test("add if update is set", () => {
  const result = setNested(simpleObject, "users.userName", "john", true)
  expect(result).toStrictEqual({
    ...simpleObject,
    users: { userName: "john" },
  })
})

test("adds if update is true", () => {
  const result = setNested(complexObject, "users.+.userName", "john", true)
  expect(result).toStrictEqual({
    users: [
      { userName: "john", name: "barney", age: 36, active: false },
      {
        userName: "john",
        name: "wilma",
        age: 32,
        active: false,
        skills: ["math", "science"],
      },
      {
        userName: "john",
        name: "betty",
        age: 37,
        active: false,
        friends: [{ name: "wilma", age: 32 }],
      },
      { userName: "john", name: "fred", age: 40, active: false },
    ],
  })
})

test("allows addressing of array index", () => {
  const result = setNested(simpleArrayObject, "1.name", "betty", true)

  expect(result).toStrictEqual([{ name: "john" }, { name: "betty" }])
})

test("allows addressing of array index", () => {
  const result = setNested(simpleArrayObject, "+.name", "betty")

  expect(result).toStrictEqual([{ name: "betty" }, { name: "betty" }])
})

test("doesn't mutate", () => {
  const clone = JSON.stringify(complexObject)
  const result = setNested(complexObject, "users", 2)
  expect(complexObject).toStrictEqual(JSON.parse(clone))
  expect(result).toStrictEqual({ users: 2 })
})

test("can perform sanitisation", () => {
  const result = setNested(complexObject, "users.+", val => {
    if (val.age >= 37) {
      return { ...val, active: true }
    }

    return val
  })

  expect(result).toStrictEqual({
    users: [
      { name: "barney", age: 36, active: false },
      { name: "wilma", age: 32, active: false, skills: ["math", "science"] },
      {
        name: "betty",
        age: 37,
        active: true,
        friends: [{ name: "wilma", age: 32 }],
      },
      { name: "fred", age: 40, active: true },
    ],
  })
})
```
