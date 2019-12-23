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
			type: tailOption.filePath,
			message: "no such file or directory"
		};

		throw new Error(generateErrorMessage(errMsg).trim()).message;
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
