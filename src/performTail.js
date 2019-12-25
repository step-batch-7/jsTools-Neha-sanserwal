`use strict`;
const {
	generateTailLines,
	loadFileLines,
	filterUserOptions,
	parseTailOptions,
	isOptionCount
} = require("./tailLib");

const areUserOptionsValid = function(userOptions) {
	if (!isOptionCount(userOptions[0])) {
		return true;
	}
	return Number.isInteger(+userOptions[1]);
};

const tail = function(cmdArgs, fs) {
	const userOptions = filterUserOptions(cmdArgs);
	if (!areUserOptionsValid(userOptions)) {
		let offset = userOptions[1];
		return { err: `tail: illegal offset -- ${offset}`, lines: "" };
	}
	let tailOptions = parseTailOptions(userOptions);
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
