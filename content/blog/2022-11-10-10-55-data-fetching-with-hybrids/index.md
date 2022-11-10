---
title: data fetching with hybrids
description: Hybrids and fetching data
date: 2022-11-10 10:55
tags: [hybrids, web-components]
---

```ts
import { html, define, store, Model } from "hybrids";

interface WithoutStore {
  url: string;
  data: Promise<Record<string, string>>;
}

export const withoutStore = define<WithoutStore>({
  tag: "without-store",
  url: "",
  data: ({ url }) => fetch(url).then((r) => r.json()),
  render: ({ data }) => html`
    <div>
      ${html.resolve(data.then(({ name }) => html`<span>${name}</span>`))}
    </div>
  `,
});

html`<without-store
  url="https://raw.githubusercontent.com/hybridsjs/hybrids/main/package.json"
></without-store>`;

interface ImplicitModel {
  id: string;
  name: string;
  scripts: Record<string, string>;
}

const ImplicitStore: Model<ImplicitModel> = {
  id: true,
  name: "",
  scripts: {},
  [store.connect]: (url) => fetch(url as string).then((res) => res.json()),
};

interface ImplicitComponent {
  packageJson: ImplicitModel;
}

export const implicit = define<ImplicitComponent>({
  tag: "implicit-package-json-viewer",
  packageJson: store(ImplicitStore), // implicitly passes the `package-json` attribute as a string to the store for instantialtion.
  render: ({ packageJson }) =>
    html` ${store.ready(packageJson) && packageJson.name} `,
});

html`<implicit-package-json-viewer
  package-json="https://raw.githubusercontent.com/hybridsjs/hybrids/main/package.json"
></implicit-package-json-viewer>`;

interface ExplicitModel {
  id: string;
  name: string;
  url: string;
  scripts: Record<string, string>;
}

const ExplicitStore: Model<ExplicitModel> = {
  id: true,
  url: "",
  name: "",
  scripts: {},
  [store.connect]: (url) => fetch(url as string).then((res) => res.json()),
};

interface ExplicitComponent {
  url: string;
  packageJson: ExplicitModel;
}

export const explicit = define<ExplicitComponent>({
  tag: "explicit-package-json-viewer",
  url: "",
  packageJson: store(ExplicitStore, { id: "url" }), // id is the identifier of the model and passed to [store.connect] as a string.
  render: ({ packageJson }) =>
    html` ${store.ready(packageJson) && packageJson.name} `,
});

html`<explicit-package-json-viewer
  url="https://raw.githubusercontent.com/hybridsjs/hybrids/main/package.json"
></explicit-package-json-viewer>`;
```