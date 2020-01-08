'use strict';

const generateTailLines = function (count, lines) {
  const splittedLines = lines.split('\n');
  if(count.startsWith('+')){
    let start = count;
    start = --start;
    const slicedLines = splittedLines.slice(start, lines.length);
    return slicedLines;
  }

  const absCount = Math.abs(count);
  const start = 0;
  const slicedLines = splittedLines.reverse().slice(start, absCount);
  return slicedLines.reverse();
};

const filterUserOptions = function (cmdArgs){
  const [, , ...userOptions] = cmdArgs;
  return userOptions;
};

module.exports = {
  generateTailLines,
  filterUserOptions
};
