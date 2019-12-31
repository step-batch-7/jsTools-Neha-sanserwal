const fs = require('fs');

const { tail } = require('./src/performTail');

const displayEndResult = function(endResult) {
  process.stderr.write(endResult.err);
  process.stdout.write(endResult.lines);
};

const main = function(cmdArgs) {
  const {stdin} = process;
  tail(cmdArgs, {fs, stdin}, displayEndResult);
};
main(process.argv);
