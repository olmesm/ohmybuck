---
title: "Quick and not-so-dirty CORS proxy"
description: "Get a proxy up and running for an external service"
date: 2018-08-21
tags: ["proxy", "cors", "heroku"]
---

Late one night I got a slack message from one of my colleagues:

![Message: I need help with a proxy](./2018-08-21-quick-and-not-so-dirty-cors-proxy.png)

It's a pretty common issue - you're trying to integrate with another company or 3rd party API and:

- You have a an API key you can't distribute to users as it may be a paid service (Think [Loquate/ex-Postcode Anywhere])
- The other service hasn't whitelisted your domain to make calls to it ([CORS])

## The main issue

Sometimes people are bogged down with other work, sysOps is nervous, or even worse slow. This could be due to company process and governance - so not necessarily their fault, but it's still a blocker. If we don't have access to a backend, one option is to spin up our own proxy server.

I'm not the biggest fan of [Heroku] for use as a production server, however in this case, I can't think of a better tool for the job.

## The code

Luckily for us, [Walkscore] provided a sample script for [Making a Server-Side API Request].

I've adapted it below to use environmental variables for the API key, and if you look at the [Dirty Proxy Repo] you'll see how I deploy it to [Heroku]

```php
<?
// Sort out our CORS Issues
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With");

// Function to make a request to the Walkscore API
function getWalkScore($lat, $lon, $address) {
  // Get API Key set in the environment varibles
  $WALKSCORE_API_KEY = getenv('WALKSCORE_API_KEY');

  $address=urlencode($address);
  $url = "http://api.walkscore.com/score?format=json&address=$address";
  $url .= "&lat=$lat&lon=$lon&wsapikey=$WALKSCORE_API_KEY";
  $str = @file_get_contents($url);

  return $str;
}

// Get the URL parameters "lat", "lon", and "adress"
$lat = $_GET['lat'];
$lon = $_GET['lon'];
$address = stripslashes($_GET['address']);

$json = getWalkScore($lat,$lon,$address);

echo $json;
?>

```

[Dirty Proxy Repo]

<!-- References -->

[dirty proxy repo]: https://gitlab.com/olmesm/walkscore-heroku-service
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[loquate/ex-postcode anywhere]: https://www.loqate.com/
[heroku]: https://www.heroku.com/
[making a server-side api request]: https://www.walkscore.com/professional/api-sample-code.php
[walkscore]: https://www.walkscore.com/
