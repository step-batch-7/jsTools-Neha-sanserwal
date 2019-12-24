const {
	generateTailLines,
	loadFileContent,
	filterUserOption,
	parseTailOption
} = require("./tailLib");
const { generateErrorMessage } = require("./errorMessages");

const performTail = function(cmdArgs, fs) {
	let tailOutput = { err: "", lines: [] };
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
	tailOption.lines = loadFileContent(tailOption.filePath, fs.readFileSync);
	tailOutput.lines = generateTailLines(tailOption);
	return tailOutput;
};

module.exports = {
	performTail
};
