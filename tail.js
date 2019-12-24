const fs = require("fs");
const { tail } = require("./src/performTail");
const main = function(cmdArgs) {
	let endResult = tail(cmdArgs, fs);
	process.stderr.write(endResult.err);
	process.stdout.write(endResult.lines.join("\n"));
};
main(process.argv);
