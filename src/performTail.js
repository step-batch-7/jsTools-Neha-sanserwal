`use strict`;
const {
	generateTailLines,
	loadFileLines,
	filterUserOptions,
	parseTailOptions
} = require("./tailLib");
const { validateUserArgs } = require("./validation");

const tail = function(cmdArgs, fs, displayEndResult) {
	const userArgs = filterUserOptions(cmdArgs);
	const userArgsValidation = validateUserArgs(userArgs);

	if (!userArgsValidation.isValid) {
		displayEndResult({ err: userArgsValidation.err, lines: "" });
		return;
	}

	let tailOptions = parseTailOptions(userArgs);
	loadFileLines(tailOptions, fs.readFile, displayEndResult);
	return;
};

module.exports = {
	tail
};
