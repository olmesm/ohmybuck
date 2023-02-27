RFC Email structure

https://stackoverflow.com/a/66551704


- from vscode to emacs:

  - https://betterprogramming.pub/emacs-or-vs-code-why-and-how-im-slowly-switching-to-gnu-emacs-ea33c0837ac4

- github action to deploy to npm and github release on npm version change

---

# Object digging

```js
const isArray = (obj) => Array.isArray(obj);
const isObject = (obj) =>
  typeof obj === "object" && obj !== null && !isArray(obj);
const isNull = (obj) => typeof obj === "object" && obj === null;

const handleArray = (arr, d) => ({
  type: "array",
  value: arr.map((e) => typeFn(e, d)),
});
const handleObject = (obj) => ({
  type: "object",
  value: Object.entries(obj).reduce(
    (a, [k, v]) => ({ ...a, [k]: typeFn(v) }),
    {}
  ),
});
const handleNull = () => ({ type: "null", value: null });
const handleSimple = (obj) => ({ type: typeof obj, value: obj });

const typeFn = (obj) => {
  if (isArray(obj)) return handleArray(obj);
  if (isObject(obj)) return handleObject(obj);
  if (isNull(obj)) return handleNull(obj);

  return handleSimple(obj);
};
```

```js
const isArray = (obj) => Array.isArray(obj);
const isObject = (obj) =>
  typeof obj === "object" && obj !== null && !isArray(obj);
const isNull = (obj) => typeof obj === "object" && obj === null;

const handleArray = (obj, path) =>
  obj.reduce((a, c, i) => ({ ...a, ...flatAddress(c, `${path}[${i}]`) }), {});
const handleObject = (obj, path) =>
  Object.entries(obj).reduce(
    (a, [k, v]) => ({ ...a, ...flatAddress(v, `${path}.${k}`) }),
    {}
  );
const handleNull = (obj, path) => ({ [path]: { type: "null", value: null } });
const handleSimple = (obj, path) => ({
  [path]: { type: typeof obj, value: obj },
});

const flatAddress = (obj, path = "$") => {
  if (isArray(obj)) return handleArray(obj, path);
  if (isObject(obj)) return handleObject(obj, path);
  if (isNull(obj)) return handleNull(obj, path);

  return handleSimple(obj, path);
};
```

---

# devtools quick fetch

```
// devtools quick fetch
const f = (type, ...args) => (middles = args => Promise.resolve(args)) =>
    fetch(...args).then(d => {
        switch(type.toLowerCase()) {
            case "j":
                return d.json()
            case "t":
                return d.text()
            default: // still allows text/json
                return d[type]()
        }
    }).then(middles).then(console.log)
```

---

# Interview Questions

https://lethain.com/appropriate-programming-problems/

I think what makes good problems to evaluate programming experience of senior and Staff-plus candidates are:

1. Support simple initial solutions and compounding requirements
1. Are solvable with a few dozen lines of code
1. Require algorithmic thinking but not knowing a specific algorithm
1. Don’t require juggling numerous variables in your head
1. Does support debugging and evolving the code
1. Are not domain specific to advantage arbitrary experience
1. Require writing actual code in language of their choice
1. Are done in a real code editor

I’m sure there are other criteria that are important, but generally I think those are a good starting point.

## Questions:

- fizzbuzz with APIS
- queue and limited resource management
- audio and event handling
