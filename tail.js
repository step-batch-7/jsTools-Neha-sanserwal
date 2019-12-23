const fs = require("fs");
const { performTail } = require("./src/performTail");
const main = function(cmdArgs) {
	let endResult = performTail(cmdArgs, fs);
	process.stderr.write(endResult.err);
	process.stdout.write(endResult.lines);
};
main(process.argv);
