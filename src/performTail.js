`use strict`;
const {
	generateTailLines,
	loadFileContent,
	filterUserOption,
	parseTailOptions
} = require("./tailLib");
const { ERRORS } = require("./errorMessageTemplate");
const performTail = function(cmdArgs, fs) {
	let endResult = { err: "", lines: [] };
	const userOption = filterUserOption(cmdArgs);
	let tailOptions = parseTailOptions(userOption);
	if (!fs.existsSync(tailOptions.filePath)) {
		endResult.err = `tail: ${tailOptions.filePath}: ${ERRORS.fileError}`;
		return endResult;
	}
	tailOptions.lines = loadFileContent(tailOptions.filePath, fs.readFileSync);
	endResult.lines = generateTailLines(tailOptions);
	return endResult;
};

module.exports = {
	performTail
};
