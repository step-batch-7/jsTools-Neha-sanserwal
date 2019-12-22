const fs = require("fs");
const fsModules = {
	readFile: fs.readFileSync,
	encoding: "utf8"
};
module.exports = {
	fsModules
};
