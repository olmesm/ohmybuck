---
title: Local Proxies and Rewrites
description: Local Proxies and Rewrites
date: 2020-06-23 04:32
tags: ["devops", "dns", "docker", "mac", "development"]
---

Tooling for running local proxy services and url rewrites.

## Use Cases

- multiple services on multiple ports, behind a single domain
- testing route-by-route service migrations with legacy service fallback

## Tools

- [switchhosts](#switchhosts)
- [Caddy Server]
- [switchboard]
- [nginxproxymanager]
- [NGINXConfig]

### [Switch Hosts]

SwitchHosts! is an App for hosts management & switching.

### [Caddy Server]

Caddy is a powerful, enterprise-ready, open source web server with automatic HTTPS. It takes care of TLS certificate renewals, OCSP stapling, static file serving, reverse proxying, Kubernetes ingress, and more.

### [switchboard]

Simple mDNS-based reverse proxy for personal infrastructure.

### [nginxproxymanager]

A pre-built docker image that enables you to easily forward to your websites running at home or otherwise, including free SSL, without having to know too much about Nginx or Letsencrypt.

### [NGINXConfig]

The easiest way to configure a performant, secure, and stable NGINX server.

<!-- MARKDOWN REFERENCES -->

[switch hosts]: https://oldj.github.io/SwitchHosts/
[caddy server]: https://caddyserver.com/
[switchboard]: https://github.com/whytheplatypus/switchboard
[nginxproxymanager]: https://nginxproxymanager.com/
[nginxconfig]: https://www.digitalocean.com/community/tools/nginx
