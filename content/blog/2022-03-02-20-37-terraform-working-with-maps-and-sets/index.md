---
title: Terraform working with Maps and Sets
description: Snippet showing map and set functions
date: 2022-03-02 20:37
tags: [devops, terraform, snippet]
---

This is just sample code and doesn't actually work due to "Elastic IPs are not supported for load balancers with type 'application'"

```hcl
locals {
  subnet_azs = [
    "eu-west-2a",
    "eu-west-2b",
    "eu-west-2c",
  ]

  eip_count = var.env == "prod" ? length(local.subnet_azs) : 0
}

resource "aws_eip" "cms" {
  count = local.eip_count

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_default_subnet" "default" {
  for_each = toset(local.subnet_azs)

  availability_zone = each.key
}

resource "aws_lb" "default" {
  name               = "default"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb.id]

  dynamic "subnet_mapping" {
    for_each = aws_default_subnet.default

    content {
      subnet_id     = subnet_mapping.value.id
      allocation_id = var.env == "prod" ? aws_eip.cms[index(local.subnet_azs, subnet_mapping.value.availability_zone)].id : null
    }
  }
}

output "fixed_ip_addresses" {
  description = "For A Record setting"
  value = aws_eip.cms.*.public_ip
}
```
