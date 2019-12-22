const {
	generateTailLines,
	loadFileContent,
	filterUserOption,
	parseTailOption
} = require("./src/lib");
const { fsModules } = require("./src/config");

const main = function(cmdArgs) {
	const userOption = filterUserOption(cmdArgs);
	let tailOption = parseTailOption(userOption);
	let fileContent = loadFileContent(
		tailOption,
		fsModules.readFile,
		fsModules.encoding
	);
	console.log(generateTailLines(fileContent));
};
main(process.argv);
