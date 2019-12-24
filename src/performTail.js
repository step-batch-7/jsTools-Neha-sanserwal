`use strict`;
const {
	generateTailLines,
	loadFileLines,
	filterUserOptions,
	parseTailOptions
} = require("./tailLib");
const { ERRORS } = require("./errorMessageTemplate");

const tail = function(cmdArgs, fs) {
	let endResult = { err: "", lines: [] };
	const userOption = filterUserOptions(cmdArgs);
	let tailOptions = parseTailOptions(userOption);
	if (!fs.existsSync(tailOptions.filePath)) {
		endResult.err = `tail: ${tailOptions.filePath}: ${ERRORS.fileError}`;
		return endResult;
	}
	let lines = loadFileLines(tailOptions.filePath, fs.readFileSync);
	endResult.lines = generateTailLines(tailOptions, lines);
	return endResult;
};

module.exports = {
	tail
};
