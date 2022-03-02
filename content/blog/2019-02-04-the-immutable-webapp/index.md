---
title: "The Immutable Webapp"
description: "Extract that config from code"
date: 2019-02-04
tags: ["immutable web app", "spa", "javascript"]
---

One of the defining features of an [Immutable Web App] is that the configuration of the web app is extracted from the code.

We've achieved this in the past by extracting the configuration to a `environments/config.json`, then prior to a build or local serve, we require the correct enviroment's JSON config into a script that appends all the keys to a property on the window object.

An example script template.

```js
const stringify = require("json-stringify-pretty-compact")

module.exports = configObject => {
  const safeJsonConfig = stringify(configObject).replace(/</g, "\\u003c") // Sanitise the JSON

  return `;(function(window) {\nwindow.__ENV__ = ${safeJsonConfig};\n})(this);`
}
```

Loading the `config.js` script before the body tag ensures the variables are available for when the app loads.

```html
...
<script src="./config.js"></script>
<body>
  <div id="app-root"></div>
</body>
...
```

In production, to prevent caching the environment variables, we would append a hash to the `config.js` file and update the `index.html` as required.

This allows us to create a deployable static artifact and use the `index.html` as the application manifest.

Prior to deploying to the environment one would run a deploy script which would unpackage the application, and update the `index.html` file for the required environment.

[Immutable Web App]'s does propose a more elegant solution.

- [Angular example]
- [React example]

<!-- Markdown References -->

[angular example]: https://github.com/ImmutableWebApps/ng-immutable-example
[immutable web app]: https://immutablewebapps.org/
[react example]: https://github.com/ImmutableWebApps/react-immutable-example
