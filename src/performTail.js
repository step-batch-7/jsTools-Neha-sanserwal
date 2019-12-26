`use strict`;
const {
	generateTailLines,
	loadFileLines,
	filterUserOptions,
	parseTailOptions
} = require("./tailLib");
const { validateUserArgs } = require("./validation");
const tail = function(cmdArgs, fs) {
	const userArgs = filterUserOptions(cmdArgs);
	const userArgsValidation = validateUserArgs(userArgs);
	if (!userArgsValidation.isValid) {
		return { err: userArgsValidation.err, lines: "" };
	}

	let tailOptions = parseTailOptions(userArgs);

	if (!fs.existsSync(tailOptions.filePath)) {
		let err = `tail: ${tailOptions.filePath}: No such file or directory`;
		return { err, lines: "" };
	}

	let lines = loadFileLines(tailOptions.filePath, fs.readFileSync);
	return { err: "", lines: generateTailLines(tailOptions, lines).join("\n") };
};

module.exports = {
	tail
};
