const {
	generateTailLines,
	loadFileContent,
	filterUserOption,
	parseTailOption,
	generateErrorMessage
} = require("./lib");

const manageTailOperation = function(cmdArgs, fsModules) {
	const userOption = filterUserOption(cmdArgs);
	let tailOption = parseTailOption(userOption);
	if (!fsModules.fileExist(tailOption.filePath)) {
		const errMsg = {
			type: "file",
			filePath: tailOption.filePath,
			message: "no such file or directory"
		};

		return new Error(generateErrorMessage(errMsg)).message;
	}
	let fileContent = loadFileContent(
		tailOption,
		fsModules.readFile,
		fsModules.encoding
	);
	return generateTailLines(fileContent);
};

module.exports = {
	manageTailOperation
};
