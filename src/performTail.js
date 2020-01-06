'use strict';
const {loadTailLines,
  generateTailLines,
  filterUserOptions} = require('./tailLib');
const {parseOptions} = require('./parseUserOptions.js');
const {tailOptions} = require('./taliOptions');

const pickReader = function(filePath, readers){
  if(filePath){
    return readers.createReadStream(filePath);
  }
  return readers.stdin;
};

const tail = function(cmdArgs, readers, onCompletion) {
  const userArgs = filterUserOptions(cmdArgs);
  const parsedOptions = parseOptions(userArgs);
  if (parsedOptions.err) {
    onCompletion({err: parsedOptions.err, lines: ''});
    return;
  }
  const tailOpt = new tailOptions(parsedOptions);
  const reader = pickReader(tailOpt.filePath, readers);
  reader.setEncoding('utf8');

  const onLoadingLines = function(loadedContent){
    if(loadedContent.err){
      onCompletion({err: loadedContent.err, lines: ''});
      return;
    }
    const totalLines = loadedContent.totalLines.trim();
    const lines = generateTailLines(tailOpt.lineCount, totalLines );
    onCompletion({err: '', lines: lines.join('\n')});
  };
  loadTailLines(tailOpt.filePath, reader, onLoadingLines);
};

module.exports = {
  tail,
  pickReader
};
