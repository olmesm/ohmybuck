---
title: IaC Beginnings
description: Learn Terraform, Terragrunt and AWS
date: 2022-03-25 09:44
tags: [terraform, terragrunt, asdf, devops, infrastructure]
draft: true
---

https://dev.to/aws-builders/24-days-to-pass-the-aws-dev-exam-exactly-how-i-did-it-2gcp

https://dev.to/loujaybee/where-and-how-to-start-learning-aws-as-a-beginner-27ab

https://dev.to/loujaybee/do-cloud-engineers-code-4f8g

https://dev.to/aws-builders/which-aws-certification-should-you-take-first-lcf

- Terraform tech concepts (map vs array)

1. Use [asdf](https://asdf-vm.com) to manage [terraform](https://github.com/asdf-community/asdf-hashicorp) and [terragrunt](https://github.com/ohmer/asdf-terragrunt) binaries [rather than installing directly](https://www.twoistoomany.com/blog/2020/11/23/how-i-work-asdf#the-problem). This allows you to switch between terraform versions [which is notorious for breaking API changes](https://github.com/hashicorp/terraform/issues/15839).

1. [Learn Terraform](https://learn.hashicorp.com/collections/terraform/certification-associate-tutorials)

   Official Documentation

   - https://www.terraform.io/docs

   Tutorials and Workshops

   - https://learn.hashicorp.com/collections/terraform/aws-get-started
   - https://awsworkshop.io/tags/terraform/

   LinkedIn Learning Courses

   - https://www.linkedin.com/learning/learning-terraform-2
   - https://www.linkedin.com/learning/advanced-terraform

   Understand

   - Why IaC.
   - Why Terraform.
   - The concept of IaC state and storage of it.
   - Working with Terraform providers, resources, inputs, and outputs.
   - Terraform modules.

1. [Learn Terragrunt](https://terragrunt.gruntwork.io/)

   - Understand how to keep configuration and instantiation separate.
   - Consider environment promotion strategies and how Terragrunt could assist.

1. [AWS Certified Solutions Architect - Associate](https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c02)

   - Learn AWS's offerings

---

**Questions to ask yourself before structuring Terraform configuration**

Listed below are a series of questions to ask yourself before you go about writing any Terraform configuration. Off the back of this, there will be a list of general guidelines to follow, please feel free to reach out to one of the DevOps team if you want to add/amend this based on your experience. We want this space to be a collaborative one and would really value your input

- What does your project look like?
- You should ideally have an architecture diagram of your infrastructure, this not only tells you the different infrastructure components of your project but also whether your project is likely to be monolithic (in other words a project managed by a single configuration file by a single state file)

- Small projects: when starting off it is very likely that your project will be monolithic to avoid problems with restructuring/refactoring code down the line, if possible, please try and develop an architecture diagram of how you see your project developing

- How has your project been set up?

- Do you have different infrastructure repositories for different applications?

- Do you have a central space with documentation about your project (e.g.: environment, architecture diagram, etc...)?
- Have you ensured that Terraform can be deployed consistently and safely?

- Do you have branch policies in place to prevent people from being able to make code changes without a PR?

- Do you have a CI/CD pipeline in place for deploying Terraform code?

- Does it include: a testing strategy?

- Does it include tools for formatting, validating and generating README.md files for code? There are some useful GIT hooks that can be added to your VCS configuration to ensure appropriate [Code styling](https://www.terraform-best-practices.com/code-styling)
- Do you have a remote state file?

- How many environments do you have? Is this likely to change and what is the timeframe for this?
- Small projects: typically this starts off with one environment, however, as your project starts to scale it is not uncommon have multiple environments within your project, by putting in a timeframe we can start to roughly estimate when would be the best time to refactor your code

- If you are likely to have different environments ensure you have different branches for all different environments

**General Guidelines**

1.  Have a detailed architecture diagram (ideally with some additional diagrams of how this might evolve in the future)
2.  One infrastructure repository per application

3.  Shared repository can be created if you are referencing the same core infrastructure for different projects, but please continue to create separate infrastructure repositories for applications and reference elements of that infrastructure using data blocks and aliases

4.  All environment specific branches have to be protected (so that it is not possible for anyone to delete them)
5.  Branch policies set up so that it is not possible to do automatic merges into dev, test, uat, staging or prod  with there being at least two recommended reviewers for merges into staging or master and one reviewer for merges into other branches
6.  It should not be possible to approve your own PR's
7.  Create a central space with information about project - **template for this coming soon**
8.  Use CircleCI for deploying terraform infrastructure (and have tests integrated within pipeline) - **template for this coming soon**

9.  README files present for non Terraform files being used in infrastructure (e.g.: bash scripts)

10. State file is set up remotely

11. **AWS:** Set up in S3 (with versioning) and Dynamo DB (to enable state locking) with machine IP's added to firewall

You can use an existing DynamoDB table for state locking, but please ensure that the table is tagged and is present in the state file as well\
b. **Azure: **Set up in storage account as a blob with machine IP's added to firewall\
   9. Minimum of two environments: dev and prod (although this will vary on case by case basis)\
How should I structure my Terraform configuration?\
e

- Ensure that you have followed general [Naming conventions](https://www.terraform-best-practices.com/naming) and have tags in place for all resources, we recommend including following resources:
- **<project_name>-<app_name>-<env>-<resource_function>**

- discovery-api-dev-lambda-eu-west-1

- no4waltz-clustering-graph-service-dev-lambda-eu-west-1

- If you are creating duplicates of the same resource/a globally unique resource, we recommend the following:
- **<project_name>-<app_name>-<env>-<resource_function>-\*\***[<random_id>](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/id)\*\*

- discovery-api-dev-data-streaming-ab123

- If you have already created a resource that needs to have a globally unique name w/o a random id, we recommend using the following naming convention:
- **<project_name>-<app_name>-<env>-<resource_function>-<region>**

- discovery-api-dev-data-streaming-eu-west-1

- Ensure you have created an S3 bucket with the naming convention defined above (example below) you should have one S3 bucket per team, with directories for each environment (e.g.: dev, test, prod, etc...) and your state file should be inside the relevant directory

- mint-tfstate-prod-eu-west-1

- Ensure that you have a separate .tf file for each infrastructure component
- Ensure that you have a separate [variables.tf](http://variables.tf/) file to store all your variables
- Always use the latest version of your providers
- If you are going to be deploying to multiple environments:

- If the code is consistently going to be the same in each environment: consider using Terragrunt
- If there is likely to be some variation in infrastructure across environments: there are different state files and workspaces corresponding to each environment

- DRY - to maintain the principle of DRY within Terraform please adhere to the following:
- Use shared modules advocated by us when possible - **coming soon**

- If you are wanting to create infrastructure w/o a shared module present please create a repository with the prefix "terraform-shared-_insert name of resource_" with semantic versioning
- locals, for_each, count - please use these where appropriate and when possible to reduce duplication and repetition of code
