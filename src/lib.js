const fs = require("fs");
const generateTailLines = function(fileContent) {
	let lines = fileContent.data.split("\n");
	let slicedLines = lines.reverse().slice(0, 10);
	return slicedLines.reverse().join("\n");
};

const loadFileContent = function(tailOption) {
	data = fs.readFileSync(tailOption.filePath, "utf8");
	return { data };
};
const parseTailOption = function(userOption) {
	return { filePath: userOption[0] };
};

const filterUserOption = function(cmdArgs) {
	let [, , ...userOption] = [...cmdArgs];
	return userOption;
};

module.exports = {
	generateTailLines,
	loadFileContent,
	filterUserOption,
	parseTailOption
};
