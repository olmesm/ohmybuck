const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const template = require("lodash/template");
const { marked } = require("marked");
const { write } = require("./write");

const BLOGS = "./content/blog";

const filesFrom = (_path) =>
  fs
    .readdirSync(_path, { withFileTypes: true })
    .map((f) => {
      const fullPath = _path + path.sep + f.name;
      if (f.isFile()) {
        return fullPath;
      }

      return filesFrom(fullPath);
    })
    .flat();

const processFrontMatter = (file) => {
  const data = matter.read(file);

  return {
    ...data,
    content: marked.parse(data.content),
    excerpt: marked.parse(data.excerpt),
    filePath: file,
    lastUpdated: fs.statSync(file).mtime,
  };
};

const DEFAULT_TEMPLATE_DATA = {
  SITE: "ohmybuck",
  SITE_LINK: "/",
  DATE: "",
};

const onlyFiles = (ext) => (f) => f.endsWith(ext);
const html = (templateData) =>
  template(fs.readFileSync("./src/template.html", "utf-8"))({
    ...DEFAULT_TEMPLATE_DATA,
    ...templateData,
  });
const noDraftPosts = (f) => !f.data.draft;

const dateOptions = { year: "numeric", month: "long", day: "numeric" };
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString(undefined, dateOptions);

const blogList = filesFrom(BLOGS)
  .filter(onlyFiles(".md"))
  .sort()
  .reverse()
  .map(processFrontMatter)
  .filter(noDraftPosts);

const dateBlurb = (created, lastUpdated) =>
  lastUpdated && formatDate(lastUpdated) !== formatDate(created)
    ? `<small>Updated ${formatDate(lastUpdated)}<br>Created ${formatDate(
        created
      )}</small><br>`
    : `<small>Created  ${formatDate(created)}</small><br>`;

const writePost = (f) => {
  write(
    f.path
      .replace(BLOGS, "build")
      .replace("content", "build")
      .replace(/md$/, "html"),
    html({
      TITLE: f.data.title,
      DATE: dateBlurb(f.data.date, f.lastUpdated) + "<hr/>",
      BODY: f.content,
    })
  );
};

blogList.map(writePost);

writePost(processFrontMatter("content/whoami.md"));

write(
  "build/index.html",
  html({
    TITLE: "home",
    BODY:
      "<ul>" +
      blogList
        .map(
          (b) =>
            `<li><a href="${b.filePath
              .replace(/^.\/content\/blog/, "")
              .replace(/index.md$/, "")}">${b.data.title}</a><br/>
              ${dateBlurb(b.data.date, b.lastUpdated)}
              ${
                b.data.description !== b.data.title
                  ? `${b.data.description}`
                  : ""
              }<hr/>
            </li>`
        )
        .join("") +
      "</ul>",
  })
);
