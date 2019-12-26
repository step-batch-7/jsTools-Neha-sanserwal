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

	try {
		let lines = loadFileLines(tailOptions.filePath, fs.readFileSync);
		let lastNLines = generateTailLines(tailOptions, lines);
		return { err: "", lines: lastNLines.join("\n") };
	} catch (error) {
		let err = `tail: ${tailOptions.filePath}: ${error.message}`;
		return { err, lines: "" };
	}
};

module.exports = {
	tail
};
