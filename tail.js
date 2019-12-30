const fs = require('fs');
const { tail } = require('./src/performTail');

const displayEndResult = function(endResult) {
  process.stderr.write(endResult.err);
  process.stdout.write(endResult.lines);
};

const main = function(cmdArgs) {
  tail(cmdArgs, fs, displayEndResult);
};
main(process.argv);
