---
title: Poor Mans Monorepo
description: Poor Mans Monorepo
date: 2021-12-03 13:54
tags: [monorepo, typescript, javascript, node]
---

Shared files and utilities can be set in the [@org/common](components/_common) package. This will be consumed in the install process and there is no capability to version the package - any breaking changes will require updates in the consuming components.

**Note that any updates to common will require a local re-build.** Build pipelines implement this already.


## Example Project Structure

| Name    | Type           | Description                              |
| ------- | -------------- | ---------------------------------------- |
| _common | libs and types | Shared utils and types                   |
| cms     | app            | Example CMS which consumes `_common`     |
| web     | app            | Example website which consumes `_common` |


```
.
├── README.md
└── components
    ├── _common
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── src
    │   │   └── models.ts
    │   └── tsconfig.json
    ├── cms
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── src
    │   │   └── index.tsx
    │   └── tsconfig.json
    └── web
        ├── package-lock.json
        ├── package.json
        ├── src
        │   └── index.tsx
        └── tsconfig.json
```

### Suggested package.json

Use postinstall to compile the ts files when dependencies are being installed.

```json
{
  "name": "@org/common",
  "private": true,
  "version": "0.0.1",
  "main": "lib",
  "types": "lib",
  "files": [
    "lib/*"
  ],
  "scripts": {
    "prepostinstall": "echo 'Uses `--no-save typescript` to prevent bundling typescript as a dependency. Dont use this for published packages.' && npm install --no-save typescript",
    "postinstall": "npm run build",
    "build": "tsc --project tsconfig.json"
  }
}
```

### Suggested tsconfig.json

```json
{
  "compilerOptions": {
    "target": "esnext",
    "lib": ["esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "outDir": "lib"
  },
  "include": ["src"]
}
```

## Suggested Readme additions or Workflow

```bash
# Rebuild from the root
npm --prefix components/_common install

# Rebuild from a components directory
npm --prefix ../_common install

# Installing in a component as `@org/common`
npm install ../_common

# Run component script
npm --prefix components/cms <npm-script>
npm --prefix components/web <npm-script>
```
