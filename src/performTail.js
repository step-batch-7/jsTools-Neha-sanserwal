`use strict`;
const {
	generateTailLines,
	loadFileLines,
	filterUserOptions,
	parseTailOptions
} = require("./tailLib");

const tail = function(cmdArgs, fs) {
	const userOption = filterUserOptions(cmdArgs);
	let tailOptions = parseTailOptions(userOption);
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
