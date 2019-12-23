const {
	generateTailLines,
	loadFileContent,
	filterUserOption,
	parseTailOption,
	generateErrorMessage
} = require("./lib");

const manageTailOperation = function(cmdArgs, fsModules, tailOutput) {
	const userOption = filterUserOption(cmdArgs);
	let tailOption = parseTailOption(userOption);
	if (!fsModules.fileExist(tailOption.filePath)) {
		const errMsg = {
			type: "file",
			filePath: tailOption.filePath,
			message: "no such file or directory"
		};
		tailOutput.err = new Error(generateErrorMessage(errMsg)).message;
		return tailOutput;
	}
	tailOption = loadFileContent(
		tailOption,
		fsModules.readFile,
		fsModules.encoding
	);
	tailOutput.data = generateTailLines(tailOption);
	return tailOutput;
};

module.exports = {
	manageTailOperation
};
