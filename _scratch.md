- from vscode to emacs:
  - https://betterprogramming.pub/emacs-or-vs-code-why-and-how-im-slowly-switching-to-gnu-emacs-ea33c0837ac4

- github action to deploy to npm and github release on npm version change

# Object digging

```js
const isArray = (obj) => Array.isArray(obj)
const isObject = (obj) =>
  typeof obj === "object" && obj !== null && !isArray(obj)
const isNull = (obj) => typeof obj === "object" && obj === null

const handleArray = (arr, d) => ({
  type: "array",
  value: arr.map((e) => typeFn(e, d)),
})
const handleObject = (obj) => ({
  type: "object",
  value: Object.entries(obj).reduce((a, [k, v]) => ({ ...a, [k]: typeFn(v) }), {})
})
const handleNull = () => ({ type: "null", value: null })
const handleSimple = (obj) => ({ type: typeof obj, value: obj })

const typeFn = (obj) => {
  if (isArray(obj)) return handleArray(obj)
  if (isObject(obj)) return handleObject(obj)
  if (isNull(obj)) return handleNull(obj)

  return handleSimple(obj)
}
```

```js
const isArray = (obj) => Array.isArray(obj)
const isObject = (obj) =>
  typeof obj === "object" && obj !== null && !isArray(obj)
const isNull = (obj) =>
  typeof obj === "object" && obj === null

const handleArray = (obj, path) => obj.reduce((a, c, i) => ({ ...a, ...flatAddress(c, `${path}[${i}]`)}), {})
const handleObject = (obj, path) => Object.entries(obj).reduce((a, [k, v]) => ({ ...a, ...flatAddress(v, `${path}.${k}`) }), {})
const handleNull = (obj, path) => ({ [path]: { type: "null", value: null } })
const handleSimple = (obj, path) => ({ [path]: { type: typeof obj, value: obj } })

const flatAddress = (obj, path = "$") => {
  if (isArray(obj))  return handleArray(obj, path)
  if (isObject(obj)) return handleObject(obj, path)
  if (isNull(obj))   return handleNull(obj, path)

  return handleSimple(obj, path)
}
```
