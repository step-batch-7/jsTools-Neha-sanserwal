const fs = require("fs");
const fsModules = {
	fileExist: fs.existsSync,
	readFile: fs.readFileSync,
	encoding: "utf8"
};
module.exports = {
	fsModules
};
