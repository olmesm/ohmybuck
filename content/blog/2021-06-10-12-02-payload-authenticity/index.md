---
title: Payload Authenticity
description: Payload Authenticity
date: 2021-06-10 12:02
tags: [rsa, http, javascript, node]
---

Encrypting a payload with a private key, to be decrpted with a public key.

```js
const crypto = require("crypto")

const PASSPHRASE = "top secret"
const SECRET_MESSAGE = "Hello World"

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase: PASSPHRASE,
  },
})

const main = async () => {
  try {
    const encrypted = crypto.privateEncrypt(
      { key: privateKey, passphrase: PASSPHRASE },
      SECRET_MESSAGE
    )

    const decrypted = crypto.publicDecrypt(publicKey, encrypted)

    console.log({
      privateKey,
      publicKey,
      encrypted: encrypted.toString("base64"),
      decrypted: decrypted.toString(),
    })

    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
module.exports = main()
```

Using files:

```js
// Prior to running this script, run the following in terminal
//     openssl genrsa -out key.pem 2048 && openssl rsa -in key.pem -outform PEM -pubout -out public.pem
const crypto = require("crypto")
const fs = require("fs")
const path = require("path")

const SECRET_MESSAGE = "Hello World"

const privateKey = fs.readFileSync(path.join(__dirname, "key.pem"), "utf-8")
const publicKey = fs.readFileSync(path.join(__dirname, "public.pem"), "utf-8")

const main = async () => {
  try {
    const encrypted = crypto.privateEncrypt({ key: privateKey }, SECRET_MESSAGE)

    const decrypted = crypto.publicDecrypt(publicKey, encrypted)

    console.log({
      privateKey,
      publicKey,
      encrypted: encrypted.toString("base64"),
      decrypted: decrypted.toString(),
    })

    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
module.exports = main()
```
