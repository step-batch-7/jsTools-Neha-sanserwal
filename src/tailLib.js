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
  const slicedLines = splittedLines.reverse().slice(0, count);
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

const parseTailOptions = function (userOption){
  if (isOptionCount(userOption[0])) {
    const count = Math.abs(userOption[1]);
    return { filePath: userOption[2], count };
  }
  return { filePath: userOption[0], count: 10 };
};

const filterUserOptions = function (cmdArgs){
  const [, , ...userOption] = cmdArgs;
  return userOption;
};

module.exports = {
  generateTailLines,
  filterUserOptions,
  parseTailOptions,
  isOptionCount,
  readErrorAndContent
};
