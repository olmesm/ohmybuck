---
title: Deploy a GCP Cloud Function from Github
description: as it says on the tin
date: 2020-06-30 22:15
tags: ["devops", "gcp", "google cloud platform"]
---

Create a github directory and add the following:

1. The build spec `./cloudbuild.yaml`

   ```yaml
   steps:
     - name: "gcr.io/cloud-builders/gcloud"
       args:
         - functions
         - deploy
         - [function_name]
         - --source=.
         - --region=europe-west1
         - --entry-point=main
         - --trigger-http
         - --runtime=python37
         - --allow-unauthenticated
   ```

1. Function `./main.py`

   ```py
   def main ():
       return "hello"
   ```

1. [Add a trigger to GCP](https://console.cloud.google.com/cloud-build/triggers)

Done!
