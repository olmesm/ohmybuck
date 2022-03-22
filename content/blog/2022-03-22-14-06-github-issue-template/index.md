---
title: GitHub Issue Template
description: GitHub Issue Template
date: 2022-03-22 14:06
tags: [TODO]
---

> In both cases, a lot of time is wasted for multiple people from ineffective bug reports. How many times do you see a report like “the app is broken”? This is followed by wasted time going back and forth <footer><cite>- [From 8th light](https://8thlight.com/blog/kevin-kotowski/2017/01/16/broken-software.html)</cite></footer>

Create a file in the repo as `.github/ISSUE_TEMPLATE.md`. Alternatively this could form the template of a Jira Bug template.

```md
<!-- .github/ISSUE_TEMPLATE.md -->

## Describe the situation
A clear and concise description of the situation.

## To Reproduce
Steps to reproduce the behaviour:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected behaviour
A clear and concise description of what you expected to happen.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Additional context
Add any other context about the problem here
```

```md
<!-- .github/ISSUE_TEMPLATE.md -->

START: [URL …or… mobile OS + app]
STEPS: 1. [list the exact steps it takes to reproduce the problem] 2. [use numbers to show each step in order] 3. [include multiple apps if necessary] 4. [write it so a 10 year old could reproduce]
ACTUAL: [identify the thing that is broken, screenshots help]
EXPECTED: [explain what you expected to see]
URGENCY: [only for critical production issue reports]

[From 8th light](https://8thlight.com/blog/kevin-kotowski/2017/01/16/broken-software.html)
```

## Triaging Table

![](/images/fBhzaUKFPIGpw_psp7lHjjR3.png)
