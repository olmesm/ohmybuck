---
title: Systems Analysis and Solution Design
description: Systems Analysis and Solution Design
date: 2022-04-14 10:19
tags: ["Systems Analysis", "Solution Design"]
draft: true
---

https://github.com/unlight/solution-architecture
https://github.com/chanakaudaya/solution-architecture-patterns
https://herbertograca.com/2019/08/12/documenting-software-architecture/
https://www.youtube.com/channel/UClB4KPy5LkJj1t3SgYVtMOQ/videos
https://www.youtube.com/channel/UC3RKA4vunFAfrfxiJhPEplw
https://khalilstemmler.com/articles/software-design-architecture/full-stack-software-design/
https://awesome-architecture.com/software-architecture/

---

https://news.ycombinator.com/item?id=31569646

The challenge is that there are different ways of "mapping" software.
You could map the way programs fit into machines, and the networks between them. This would be the topology.

You can map the way services call upon one another with requests. This is the service graph.

You can map how systems interact over events or shared resources. You could say this is the logical graph.

The problem happens when you try and graph them all at once. It's the same as trying to draw a real map, with all the services, bus routes, railways, shops and administrative regions superimposed on one image. It's very busy.

So I use separate maps.

Tools are another matter. Personally I use Mermaid for graphs. I also have my own tools that create SVG visualisations using DAGre. This can be helpful for interactive visualisations where you can click into different nodes and explore more detail.

My system uses CloudFormation templates and our in house deployment DSLs to figure out the "topology", then let the users see the different superimposed "graphs" as they see fit
