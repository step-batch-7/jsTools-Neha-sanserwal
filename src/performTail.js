'use strict';
const {loadTailLines,
  generateTailLines,
  filterUserOptions} = require('./tailLib');
const {parseOptions} = require('./parseUserOptions.js');

const pickReader = function(filePath, readers){
  if(filePath){
    return readers.createReadStream(filePath);
  }
  return readers.stdin;
};

const tail = function(cmdArgs, readers, onCompletion) {
  const userArgs = filterUserOptions(cmdArgs);
  const tailOptions = parseOptions(userArgs);

  if (tailOptions.err) {
    onCompletion({err: tailOptions.err, lines: ''});
    return;
  }

  const reader = pickReader(tailOptions.filePath, readers);
  reader.setEncoding('utf8');

  const onLoadingLines = function(loadedContent){
    if(loadedContent.err){
      onCompletion({err: loadedContent.err, lines: ''});
      return;
    }
    const totalLines = loadedContent.totalLines.trim();
    const lines = generateTailLines(tailOptions.count, totalLines );
    onCompletion({err: '', lines: lines.join('\n')});
  };
  loadTailLines(tailOptions.filePath, reader, onLoadingLines);
};

module.exports = {
  tail,
  pickReader
};
