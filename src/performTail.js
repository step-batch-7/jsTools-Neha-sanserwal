'use strict';
const {onReadingContent, filterUserOptions } = require('./tailLib');
const { parseOptions } = require('./parseUserOptions.js');

const tail = function(cmdArgs, fs, onCompletion) {
  const userArgs = filterUserOptions(cmdArgs);
  const tailOptions = parseOptions(userArgs);

  if (tailOptions.err) {
    onCompletion({ err: tailOptions.err, lines: '' });
    return;
  }
  const path = tailOptions.filePath;
  fs.readFile(path, 'utf8', onReadingContent.bind({onCompletion, tailOptions}));
};



module.exports = {
  tail
};
