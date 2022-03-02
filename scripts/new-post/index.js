const fs = require("fs");
const path = require("path");
const caseTitle = require("title");
const kebabCase = require("lodash/kebabcase");
const _template = require("lodash/template");

const root = process.cwd();

const exitSuccessfully = (message) => {
  console.log(message || "Done!");
  process.exit(0);
};

const exitError = (message) => {
  console.trace(message || "Unexpected error");
  process.exit(1);
};

const generateDateString = () => {
  const now = new Date();

  return [
    now.getFullYear(),
    ("0" + (now.getMonth() + 1)).slice(-2),
    ("0" + now.getDate()).slice(-2),
    ("0" + now.getHours()).slice(-2),
    ("0" + now.getMinutes()).slice(-2),
  ].join("-");
};

const getUserInput = () => {
  const [_, __, ...userInput] = process.argv;

  if (userInput.length === 0) {
    exitError(
      `

      Please specify a post name, eg "node scripts/new-post my post name"
      `
    );
  }

  return userInput.join(" ");
};

const frontMatterSafeDate = (date) => date.replace(/-(\d\d)-(\d\d)$/, " $1:$2");

const dateString = generateDateString();
const title = getUserInput();

const outputDir = path.join(
  root,
  "content",
  "blog",
  `${dateString}-${kebabCase(title)}`
);

const outputPath = path.join(outputDir, "index.md");

const main = () => {
  try {
    const template = fs.readFileSync(
      path.join(__dirname, "post.md.tpl"),
      "utf8"
    );

    const outputFile = _template(template)({
      date: frontMatterSafeDate(dateString),
      title: caseTitle(title),
      description: caseTitle(title),
    });

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, outputFile, "utf8");

    exitSuccessfully(`Successfuly wrote ${outputPath}`);
  } catch (e) {
    exitError(e);
  }
};

return main();
