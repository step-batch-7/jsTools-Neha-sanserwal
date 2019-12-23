const { fsModules, tailOutput } = require("./src/config");
const { manageTailOperation } = require("./src/manageTailOperation");
const main = function(cmdArgs) {
	let endResult = manageTailOperation(cmdArgs, fsModules, tailOutput);
	process.stderr.write(endResult.err);
	process.stdout.write(endResult.data);
};
main(process.argv);
