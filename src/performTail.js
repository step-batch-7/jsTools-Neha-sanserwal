const {
	generateTailLines,
	loadFileContent,
	filterUserOption,
	parseTailOptions
} = require("./tailLib");
const { generateErrorMessage } = require("./errorMessages");

const performTail = function(cmdArgs, fs) {
	let tailOutput = { err: "", lines: [] };
	const userOption = filterUserOption(cmdArgs);
	let tailOptions = parseTailOptions(userOption);
	if (!fs.existsSync(tailOptions.filePath)) {
		const errMsg = {
			type: "file",
			filePath: tailOptions.filePath,
			message: "no such file or directory"
		};
		tailOutput.err = new Error(generateErrorMessage(errMsg)).message;
		return tailOutput;
	}
	tailOptions.lines = loadFileContent(tailOptions.filePath, fs.readFileSync);
	tailOutput.lines = generateTailLines(tailOptions);
	return tailOutput;
};

module.exports = {
	performTail
};
