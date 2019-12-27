`use strict`;
const {
	generateTailLines,
	loadFileLines,
	filterUserOptions,
	parseTailOptions
} = require("./tailLib");
const { validateUserArgs } = require("./validation");

const fileErrors = {
	fileName: "",
	get EACCES() {
		return `${this.fileName}: Permission denied`;
	},
	get ENOENT() {
		return `${this.fileName}: No such file or directory`;
	},
	EISDIR: ""
};

const tail = function(cmdArgs, fs, displayEndResult) {
	const userArgs = filterUserOptions(cmdArgs);
	const userArgsValidation = validateUserArgs(userArgs);

	if (!userArgsValidation.isValid) {
		displayEndResult({ err: userArgsValidation.err, lines: "" });
		return;
	}

	let tailOptions = parseTailOptions(userArgs);

	if (!fs.existsSync(tailOptions.filePath)) {
		fileErrors.fileName = tailOptions.filePath;
		displayEndResult({ err: `tail: ${fileErrors.ENOENT}`, lines: "" });
		return;
	}
	loadFileLines(tailOptions, fs.readFile, displayEndResult);
	return;
};

module.exports = {
	tail
};
