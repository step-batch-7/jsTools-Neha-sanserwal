'use strict';
const {loadTailLines,
  generateTailLines, filterUserOptions} = require('./tailLib');
const { parseOptions } = require('./parseUserOptions.js');

const pickAction = function(path, readers){
  if(path){
    return readers.fs.createReadStream(path);
  } 
  return readers.stdin;
};

const tail = function(cmdArgs, readers, onCompletion) {
  const userArgs = filterUserOptions(cmdArgs);
  const tailOptions = parseOptions(userArgs);

  if (tailOptions.err) {
    onCompletion({ err: tailOptions.err, lines: '' });
    return;
  }
  const path = tailOptions.filePath;
  const reader = pickAction(path, readers);
  reader.setEncoding('utf8');

  const onLoadingLines = function(loadedContent){
    if(loadedContent.err){
      onCompletion({err: loadedContent.err, lines: ''});
    }
    const totalLines = loadedContent.totalLines.trim();
    const lines =generateTailLines(tailOptions.count, totalLines );
    onCompletion({err: '', lines: lines.join('\n')});
  };

  loadTailLines(path, reader, onLoadingLines);
};

module.exports = {
  tail
};
