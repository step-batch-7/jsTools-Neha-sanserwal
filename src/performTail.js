'use strict';
const {
  readErrorAndContent,
  filterUserOptions
} = require('./tailLib');
const { parseOptions } = require('./parseUserOptions.js');

const tail = function(cmdArgs, fs, displayEndResult) {
  const userArgs = filterUserOptions(cmdArgs);
  const tailOptions = parseOptions(userArgs);
  if (tailOptions.err) {
    displayEndResult({ err: tailOptions.err, lines: '' });
    return;
  }

  
  fs.readFile(
    tailOptions.filePath,
    'utf8',
    readErrorAndContent.bind({ displayEndResult, tailOptions })
  );
};

module.exports = {
  tail
};
