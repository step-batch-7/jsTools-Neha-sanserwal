'use strict';
const fileErrors = {
  EACCES: function (fileName) {
    return `tail: ${fileName}: Permission denied`;
  },
  ENOENT: function (fileName) {
    return `tail: ${fileName}: No such file or directory`;
  },
  EISDIR: ''
};

const generateTailLines = function (count, lines) {
  const splittedLines = lines.split('\n');
  if(count=== '+1'){
    return splittedLines;
  }
  if(count.startsWith('+')){
    const slicedLines = splittedLines.slice(count, lines.length);
    return slicedLines;
  }
  const absCount = Math.abs(count);
  const start = 0;
  const slicedLines = splittedLines.reverse().slice(start, absCount);
  return slicedLines.reverse();
};

const readErrorAndContent = function (err, content) {
  if (err) {
    const error  = `${fileErrors[err.code](this.tailOptions.filePath)}`;
    this.displayEndResult({ err: error, lines: '' });
    return;
  }
  const lines = generateTailLines(this.tailOptions.count, content.trim());
  this.displayEndResult({ lines: lines.join('\n'), err: '' });
};

const filterUserOptions = function (cmdArgs){
  const [, , ...userOptions] = cmdArgs;
  return userOptions;
};

module.exports = {
  generateTailLines,
  filterUserOptions,
  readErrorAndContent
};
