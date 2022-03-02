const path = require("path");
const fs = require("fs");

const mkdirp = (outFile) => {
  fs.mkdirSync(path.dirname(outFile), {
    recursive: true,
  });
};

const write = (outFile, data) => {
  mkdirp(outFile);

  return fs.writeFileSync(outFile, data, "utf8");
};

exports.mkdirp = mkdirp;
exports.write = write;
