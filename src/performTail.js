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
	get EEXIST() {
		return `${this.fileName}: No such file or directory`;
	},
	EISDIR: ""
};

const tail = function(cmdArgs, fs) {
	const userArgs = filterUserOptions(cmdArgs);
	const userArgsValidation = validateUserArgs(userArgs);

	if (!userArgsValidation.isValid) {
		return { err: userArgsValidation.err, lines: "" };
	}

	let tailOptions = parseTailOptions(userArgs);

	if (!fs.existsSync(tailOptions.filePath)) {
		fileErrors.fileName = tailOptions.filePath;
		return { err: `tail: ${fileErrors.EEXIST}`, lines: "" };
	}

	try {
		let lines = loadFileLines(tailOptions.filePath, fs.readFileSync);
		let lastNLines = generateTailLines(tailOptions, lines);
		return { err: "", lines: lastNLines.join("\n") };
	} catch (error) {
		fileErrors.fileName = tailOptions.filePath;
		return { err: `tail: ${fileErrors[error.code]}`, lines: "" };
	}
};

module.exports = {
	tail
};
