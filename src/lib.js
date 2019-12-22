const { fsModule } = require("./config");
const generateTailLines = function(fileContent) {
	let lines = fileContent.data.split("\n");
	let slicedLines = lines.reverse().slice(0, 10);
	return slicedLines.reverse().join("\n");
};

const loadFileContent = function(tailOption) {
	data = fsModule.readFile(tailOption.filePath, fsModule.encoding);
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
