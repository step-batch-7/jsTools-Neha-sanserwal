const { fsModules } = require("./src/config");
const { manageTailOperation } = require("./src/manageTailOperation");
const main = function(cmdArgs) {
	console.log(manageTailOperation(cmdArgs, fsModules));
};
main(process.argv);
