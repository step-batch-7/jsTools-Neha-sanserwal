'use strict';
const {
  readErrorAndContent,
  filterUserOptions,
  parseTailOptions
} = require('./tailLib');
const { validateUserArgs } = require('./validation');

const tail = function(cmdArgs, fs, displayEndResult) {
  const userArgs = filterUserOptions(cmdArgs);
  const userArgsValidation = validateUserArgs(userArgs);

  if (!userArgsValidation.isValid) {
    displayEndResult({ err: userArgsValidation.err, lines: '' });
    return;
  }

  const tailOptions = parseTailOptions(userArgs);
  fs.readFile(
    tailOptions.filePath,
    'utf8',
    readErrorAndContent.bind({ displayEndResult, tailOptions })
  );
};

module.exports = {
  tail
};
