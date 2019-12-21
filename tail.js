const {
	generateTailLines,
	loadFileContent,
	filterUserOption,
	parseTailOption
} = require("./src/lib");

const main = function(cmdArgs) {
	const userOption = filterUserOption(cmdArgs);
	let tailOption = parseTailOption(userOption);
	let fileContent = loadFileContent(tailOption);
	console.log(generateTailLines(fileContent));
};
main(process.argv);
