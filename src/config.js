const fs = require("fs");
const fsModules = {
	fileExist: fs.existsSync,
	readFile: fs.readFileSync,
	encoding: "utf8"
};
const tailOutput = {
	data: "",
	err: ""
};
module.exports = {
	fsModules,
	tailOutput
};
