const {
	generateTailLines,
	loadFileContent,
	filterUserOption,
	parseTailOption,
	generateErrorMessage
} = require("./tailLib");

const performTail = function(cmdArgs, fs) {
	let tailOutput = { err: "", lines: "" };
	const userOption = filterUserOption(cmdArgs);
	let tailOption = parseTailOption(userOption);

	if (!fs.existsSync(tailOption.filePath)) {
		const errMsg = {
			type: "file",
			filePath: tailOption.filePath,
			message: "no such file or directory"
		};
		tailOutput.err = new Error(generateErrorMessage(errMsg)).message;
		return tailOutput;
	}
	tailOption = loadFileContent(tailOption, fs.readFileSync);
	tailOutput.lines = generateTailLines(tailOption);
	return tailOutput;
};

module.exports = {
	performTail
};
