---
title: Performing a DNS Migration with Reduced Risk
description: Minimal downtime for a live site DNS migration
date: 2022-03-24 08:18
tags: [dns migrations]
---

Read through this post fully before getting started. Plan 2 days minimum to complete all the steps with the least amount of risk and stress.

## Pre-Migration Testing

#### Tools

- Any browser
- [Switchhosts](https://swh.app/) for easy and consistent hosts file management
- [ping](https://linux.die.net/man/8/ping) (already installed)
- [hoppscotch.io](https://hoppscotch.io) / postman

#### Steps

1. Setup the new production server. Note any routes or APIs to be tested.
1. Get the IP address of the new server. This can be achieved with [ping](https://linux.die.net/man/8/ping).

   ```bash
   ping example.com
   ```

1. Optionally, create a backup of your existing hosts file.

   ```bash
   sudo cp /etc/hosts /etc/hosts.backup-$(date '+%Y-%m-%d-%Hh%Mm')
   ```

1. Append to your hosts file using either [Switchhosts](https://swh.app/) or [manually](https://pagely.com/kb/en/edit-hosts-file-wordpress/)
1. [Flush local DNS cache](https://phoenixnap.com/kb/how-to-flush-dns-cache).

   ```bash
   sudo killall -HUP mDNSResponder && echo "done"
   ```

1. Test the site with your browser. If this doesnt work as expected continue with the next step to debug.
1. Test API(s) with [hoppscotch.io](https://hoppscotch.io) / postman (Start building up a collection of the endpoints for testing if you havent already). Debugging may need to a [host header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host) added to the request.

## Pre-Day Planning

1. Look at analytics and advise the client when the best time would be. Plan to experience downtime and you may need to inform users. [Prefer early mornings](https://shortcut.com/blog/dont-deploy-on-frida-3-other-unwritten-rules-of-software-engineering) or [early in the week](https://medium.com/openclassrooms-product-design-and-engineering/do-not-deploy-on-friday-92b1b46ebfe6). This is a gateway to the clients system and regardless of planning, changes will carry risk.
1. Plan a brief session with the product owner, ideally two technical members who will be performing the DNS migration, and invite the client/stakeholder for transparency.
1. Get access to the production DNS host or inform the client that a team member with access will to attend the briefing call.
1. [Reduce the DNS TTL](https://answers.netlify.com/t/support-guide-minimal-downtime-for-a-live-site-dns-migration/141) for minimal downtime.
1. Schedule 3 sessions with the client for the migration day. At least 30mins each, and at least 2hrs apart. The sessions will be for rollout (±5mins) & testing (±10mins - adjust as needed), and if any issues, rollback (±5mins). The planned gaps are for debugging and making appropriate changes to code and systems before the next attempt.
1. Discuss and agree with the client the bug triaging process. See this [triaging table](/2022-03-22-14-06-github-issue-template#triaging-table) as a starting point.

## Rollout Process

#### Tools

- Read the DNS host documentation and think through the steps.
- [dnschecker](https://dnschecker.org/)
- [Flush Cache](https://developers.google.com/speed/public-dns/cache)
- [Opera Browser](https://www.opera.com/features/free-vpn) or an equivalent browser and VPN
- [hoppscotch.io](https://hoppscotch.io) / postman

#### Steps

1. Ensure all host files have been restored from prior testing.
1. [Flush local DNS cache](https://phoenixnap.com/kb/how-to-flush-dns-cache).

   ```bash
   sudo killall -HUP mDNSResponder && echo "done"
   ```

1. Talk through the steps and the plan. Acknowledge any previously failed attempts, the fixes that have been implemented, and the next steps.
1. Create a backup of the values you plan to change and store then in a shared location. Consider doing an export via the existing provider. Be aware nameserver transfers will require more records to be moved.
1. Update the DNS values in the DNS hosting provider.
1. [Flush Public Cache](https://developers.google.com/speed/public-dns/cache).
1. Open the page via VPN in an Opera incognito window.
1. Ensure there are no [unexpected SSL issues](https://www.netlify.com/blog/2021/04/06/migrating-dns-for-a-production-site-we-made-you-a-site-migration-checklist/).
1. Test the routes and APIs previously noted. Run any Hoppscotch collections, e2e test suites, or a smoke tests.
1. If there are any issues note them down. Proceed to gather as much information as possible. Aim to test the whole system - consider other paths around the failiures to see if there are other areas overlooked. ie homepage may not work but API's do.
1. Assess if the errors experienced are critical, as per [triage table](/2022-03-22-14-06-github-issue-template#triaging-table).
1. Move to [Rollback Process](#rollback-process) if needed.
1. Use [dnschecker](https://dnschecker.org/) to check if propogation has finished.
1. Write out and send a report with the results, steps followed, errors experienced, and next steps.
1. If successful, increase the [DNS TTL](https://answers.netlify.com/t/support-guide-minimal-downtime-for-a-live-site-dns-migration/141).

## Rollback Process

#### Tools

As per [rollout process](#rollout-process).

#### Steps

1. **Most importantly;** if there are any issues note them down. Proceed to gather as much information as possible. Aim to test the whole system - consider other paths around the failiures to see if there are other areas overlooked. ie homepage may not work but API's do.
1. Update the DNS values in the DNS hosting provider to the original values.
1. [Flush Public Cache](https://developers.google.com/speed/public-dns/cache).
1. Open the page via VPN in an Opera incognito window.
1. Ensure there are no [unexpected SSL issues](https://www.netlify.com/blog/2021/04/06/migrating-dns-for-a-production-site-we-made-you-a-site-migration-checklist/).
1. Test the routes and APIs previously noted. Run any Hoppscotch collections, e2e test suites, or a smoke tests.
1. [Flush Public Cache](https://developers.google.com/speed/public-dns/cache).
1. Use [dnschecker](https://dnschecker.org/) to check if propogation has finished.
1. Write out and send a report with the results, steps followed, errors experienced, and next steps.

## Further Info

- [What is a Nameserver](https://kinsta.com/knowledgebase/what-is-a-nameserver/)
- [Netlify site migration checklist](https://www.netlify.com/blog/2021/04/06/migrating-dns-for-a-production-site-we-made-you-a-site-migration-checklist/)

## Further Tools

- [Cloudflare DNS](https://www.cloudflare.com/en-gb/dns/)
- [Traceroute](https://www.fortinet.com/resources/cyberglossary/traceroutes) for figuring out the routing hops data has to go through.
- [Google Admin Toolbox - Dig](https://toolbox.googleapps.com/apps/dig/) for DNS lookup by querying name servers.
- [dig](https://www.hostinger.co.uk/tutorials/how-to-use-the-dig-command-in-linux/) as above, but locally run.
- [Nginx for host rewrite](https://www.nginx.com/blog/creating-nginx-rewrite-rules/)
