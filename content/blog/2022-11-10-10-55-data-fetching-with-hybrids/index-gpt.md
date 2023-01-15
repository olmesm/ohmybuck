---
title: data fetching with hybrids
description: Hybrids and fetching data
date: 2022-11-10 10:55
tags: [hybrids, web-components]
---

In order to fetch data into a component using hybrids.js, you can use the fetch or axios library to make an HTTP request and then store the response data in a state property of the component. Here is an example of using fetch to fetch data from a JSON file and store it in a data property of the component's state:

```js
import { hybrids } from "hybrids";

const MyComponent = {
  data: [],
  loadData: async function () {
    const response = await fetch("data.json");
    this.data = await response.json();
  },
  render: (state) => state.data,
};

customElements.define("my-component", hybrids(MyComponent));
```

In this example, the MyComponent object defines a data property that will store the fetched data, a loadData function that makes the fetch request, and a render function that returns the data property.

You can call this function in the component's connectedCallback lifecycle method, which is called when the component is added to the DOM.

```js
const MyComponent = {
  data: [],
  loadData: async function () {
    const response = await fetch("data.json");
    this.data = await response.json();
  },
  render: (state) => state.data,
  connectedCallback: (host) => host.loadData(),
};
```

This way, when the component is added to the DOM, it will automatically fetch the data and update its state.

Here is an example of how you might fetch data into a component using hybrids.js and TypeScript:

```ts
import { hybrids } from "hybrids";

interface MyComponent extends HTMLElement {
  data: any[];
}

const MyComponent: hybrids.Hybrids<MyComponent> = {
  data: [],
  loadData: async function (host) {
    const response = await fetch("data.json");
    host.data = await response.json();
  },
  render: (host) => host.data,
  connectedCallback: (host) => host.loadData(),
};

customElements.define("my-component", MyComponent);
```

In this example, I created an interface MyComponent that extends HTMLElement and has a data property of type any[]. Then I defined the MyComponent object as a hybrids.Hybrids of this interface, which gives you the benefits of type checking, intellisense, and improved readability.

In the loadData method, I passed the host element (host) as an argument, which is the current instance of the component, then use it to access data property.

The render function now accepts the host element as a parameter and returns the data property.

In the connectedCallback method, I call the loadData method of the host element. This way, when the component is added to the DOM, it will automatically fetch the data and update its state.

This should help you with type-safety and improved development experience.
