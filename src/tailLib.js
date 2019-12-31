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

const loadTailLines = function(path, reader, onLoadingLines){
  let totalLines = '';
  reader.on('data', (data) => {
    totalLines = totalLines.concat(data);
  });
  reader.on('end', () => {
    onLoadingLines({totalLines: totalLines.trim(), err: ''});
  });
  reader.on('error', (err) => {
    onLoadingLines({totalLines: '', err: fileErrors[err.code](path)});
  });
};

// const onReadingContent = function (err, content) {
//   if (err) {
//     const error  = `${fileErrors[err.code](this.tailOptions.filePath)}`;
//     this.onCompletion({ err: error, lines: '' });
//     return;
//   }

//   const lines = generateTailLines(this.tailOptions.count, content.trim());
//   this.onCompletion({ lines: lines.join('\n'), err: '' });
// };

const filterUserOptions = function (cmdArgs){
  const [, , ...userOptions] = cmdArgs;
  return userOptions;
};

module.exports = {
  generateTailLines,
  filterUserOptions,
  loadTailLines
};
