---
title: Tip to Familiarize with New JavaScript Codebases
description: A brief summary of Kevin Peters post on measuring complexity in JS & TS codebases
date: 2021-04-29 08:50
tags: [javascript, analysis, complexity, software engineering]
---

Please read the origninal post on <https://www.kevinpeters.net/the-fastest-way-to-understand-new-code-bases>.

The following are direct snippets from the above link.

---

### React.js

React.js is a frontend framework that almost every web developer knows by now. What most people do not know is how the codebase is structured and what are the core parts. So let us have a look at it.

```bash
npx code-complexity . --limit 20 --sort ratio
```

Running the command will lead to the following result:

| file                                                                                       | complexity | churn | ratio  |
| ------------------------------------------------------------------------------------------ | ---------- | ----- | ------ |
| packages/eslint-plugin-react-hooks/\*\*tests\*\*/ESLintRuleExhaustiveDeps-test.js          | 7742       | 51    | 394842 |
| packages/react/src/\*\*tests\*\*/ReactProfiler-test.internal.js                            | 4002       | 95    | 380190 |
| packages/react-reconciler/src/ReactFiberWorkLoop.new.js                                    | 2373       | 139   | 329847 |
| packages/react-reconciler/src/ReactFiberWorkLoop.old.js                                    | 2373       | 114   | 270522 |
| packages/react-dom/src/server/ReactPartialRenderer.js                                      | 1379       | 122   | 168238 |
| packages/react-reconciler/src/ReactFiberCommitWork.new.js                                  | 2262       | 71    | 160602 |
| packages/react-devtools-shared/src/backend/renderer.js                                     | 2952       | 54    | 159408 |
| packages/react-reconciler/src/ReactFiberBeginWork.new.js                                   | 2903       | 53    | 153859 |
| scripts/rollup/bundles.js                                                                  | 760        | 199   | 151240 |
| packages/react-reconciler/src/ReactFiberHooks.new.js                                       | 2622       | 56    | 146832 |
| packages/react-dom/src/client/ReactDOMHostConfig.js                                        | 1018       | 140   | 142520 |
| packages/react-reconciler/src/ReactFiberHooks.old.js                                       | 2622       | 50    | 131100 |
| packages/react-reconciler/src/\*\*tests\*\*/ReactHooks-test.internal.js                    | 1641       | 74    | 121434 |
| packages/react-dom/src/\*\*tests\*\*/ReactDOMComponent-test.js                             | 2346       | 51    | 119646 |
| packages/react-dom/src/\*\*tests\*\*/ReactDOMServerPartialHydration-test.internal.js       | 2150       | 49    | 105350 |
| packages/react-noop-renderer/src/createReactNoop.js                                        | 966        | 109   | 105294 |
| packages/react-reconciler/src/ReactFiberCommitWork.old.js                                  | 2262       | 46    | 104052 |
| packages/react-reconciler/src/ReactFiberBeginWork.old.js                                   | 2903       | 35    | 101605 |
| packages/react-reconciler/src/\*\*tests\*\*/ReactIncrementalErrorHandling-test.internal.js | 1532       | 62    | 94984  |
| packages/react-refresh/src/\*\*tests\*\*/ReactFresh-test.js                                | 3165       | 29    | 91785  |

What we can see here is that two sub-packages are probably the most interesting to understand:

- packages/react-dom
- packages/react-reconciler

Understanding React Fiber and how react-dom's partial renderer is working will give you a good idea about React's architecture. A good thing about the code within React is that it is well documented with comments even though it is complex at first.

## Where does this technique come from?

This technique of analyzing a codebase originally came from a book that handles refactoring large codebases via a process: [Software Design X-Rays](https://www.amazon.de/Software-Design-X-Rays-Technical-Behavioral/dp/1680502727?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=Software+Design+X-Rays&qid=1615637678&sr=8-1&linkCode=ll1&tag=kevinpeters38-21&linkId=e90c90e5869a073cebb13f2fe26e865e&language=de_DE&ref_=as_li_ss_tl) by Adam Tornhill. It is a great book and teaches you a lot of ways to structure your code and what parts are worth refactoring. A great book. I think every software engineer should have read it at some point because it will help them to understand a codebase differently. With working on a project, people will get familiar with different parts of the software and of course, they will have their special "area" of code where they are super comfortable. If this code is good and understandable is another question though, that this book tries to answer.
