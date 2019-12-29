'use strict';
const fileErrors = {
  EACCES: function (fileName)
  {
    return `tail: ${fileName}: Permission denied`;
  },
  ENOENT: function (fileName)
  {
    return `tail: ${fileName}: No such file or directory`;
  },
  EISDIR: ''
};

const generateTailLines = function (count, lines){
  const splittedLines = lines.split('\n');
  if(count=== '+1'){
    return splittedLines;
  }
  if(count.startsWith('+')){
    const slicedLines = splittedLines.slice(count, lines.length);
    return slicedLines;
  }
  const absCount = Math.abs(count);
  const slicedLines = splittedLines.reverse().slice(0, absCount);
  return slicedLines.reverse();
};

const readErrorAndContent = function (err, content){
  if (err) {
    const path = this.tailOptions.filePath;
    const endResult = { err: `${fileErrors[err.code](path)}`, lines: '' };
    this.displayEndResult(endResult);
    return;
  }

  const lines = generateTailLines(this.tailOptions.count, content.trim());
  this.displayEndResult({ lines: lines.join('\n'), err: '' });
};

const isOptionCount = function (option){
  return option === '-n';
};

const filterUserOptions = function (cmdArgs){
  const [, , ...userOptions] = cmdArgs;
  return userOptions;
};

module.exports = {
  generateTailLines,
  filterUserOptions,
  isOptionCount,
  readErrorAndContent
};
