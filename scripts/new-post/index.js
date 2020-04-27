const pupa = require("pupa")
const fs = require("fs")
const path = require("path")
const startCase = require("lodash.startcase")
const kebabCase = require("lodash.kebabcase")

const exitSuccessfully = message => {
  console.log(message || "done!")
  process.exit(0)
}

const exitError = message => {
  console.trace(message || "Unexpected error")
  process.exit(1)
}

const now = new Date()

const DATE = [
  now.getFullYear(),
  ("0" + (now.getMonth() + 1)).slice(-2),
  ("0" + now.getDate()).slice(-2),
  ("0" + now.getHours()).slice(-2),
  ("0" + now.getMinutes()).slice(-2),
].join("-")

const template = fs.readFileSync(path.join(__dirname, "post.md.tpl"), "utf8")

const [_, __, ...userInput] = process.argv

if (userInput.length === 0) {
  exitError(
    `

Please specify a post name, eg "node scripts/new-post my post name"
`
  )
}

const title = userInput.join(" ")

const outputDir = path.join(
  __dirname,
  "..",
  "..",
  "content",
  "blog",
  `${DATE}-${kebabCase(title)}`
)

const outputPath = path.join(outputDir, "index.md")

const main = () => {
  try {
    const outputFile = pupa(template, {
      date: DATE,
      title: startCase(title),
      description: startCase(title),
    })

    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(outputPath, outputFile, "utf8")

    exitSuccessfully(`Successfuly wrote ${outputPath}`)
  } catch (e) {
    exitError(e)
  }
}

return main()
