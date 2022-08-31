---
title: Non-Uniform Collection to Table
description: Non-Uniform Collection to Table
date: 2022-08-31 09:27
tags: [typescript]
---

Convert a non-uniform collection into a matrix for use in a table element or CSV output.

```typescript
const input = [
  { id: 1, name: "jo" },
  { id: 2, name: "zed", age: 26 },
  { id: 3, name: "lee", location: "uk" },
];

const output = [
  [1, 2, 3],
  ["jo", "zed", "lee"],
  [null, 26, null],
  [null, null, "uk"],
];
```

```typescript
import { describe, expect, it } from "vitest";
import { tableConvert } from "./Table";

const input = [
  { id: 1, name: "jo" },
  { id: 2, name: "zed", age: 26 },
  { id: 3, name: "lee", location: "uk" },
];

const output = {
  headers: ["id", "name", "age", "location"],
  data: [
    [1, 2, 3],
    ["jo", "zed", "lee"],
    [null, 26, null],
    [null, null, "uk"],
  ],
};

describe("table convert", () => {
  it("converts a collection", () => {
    expect(tableConvert(input)).toStrictEqual(output);
  });

  it("converts a collection with required headers as input", () => {
    const headers1 = ["id"];
    expect(tableConvert(input, headers1)).toStrictEqual({
      headers: headers1,
      data: [output.data[0]],
    });

    const headers2 = ["id", "age"];
    expect(tableConvert(input, headers2)).toStrictEqual({
      headers: headers2,
      data: [output.data[0], output.data[2]],
    });
  });
});
```

```typescript
export const tableConvert = <T extends Record<string, any>>(
  obj: T[],
  headings?: string[]
) => {
  const uniqueKeys = headings
    ? headings
    : [...new Set(obj.flatMap(Object.keys))];

  const createRow = (key: keyof T) => obj.map((item) => item[key] || null);

  const output = uniqueKeys.map(createRow);

  return { headers: uniqueKeys, data: output };
};
```
