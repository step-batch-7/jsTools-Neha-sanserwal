'use strict';
const {generateTailLines, filterUserOptions} = require('./tailLib');
const {parseOptions} = require('./parseUserOptions.js');
const {loadTailLines} = require('./readStream.js');

const pickReader = function(filePath, readers){
  if(filePath){
    return readers.createReadStream(filePath);
  }
  return readers.stdin;
};

class CmdLineTool{
  constructor(cmdArgs, readers, onCompletion){
    this.cmdArgs = cmdArgs;
    this.readers = readers;
    this.onCompletion = onCompletion;
    this.tailOptions = {count: '10', tail: ''};
  }

  onLoadingLines(loadedContent){
   
    if(loadedContent.err){
      this.onCompletion({err: loadedContent.err, lines: ''});
      return;
    }
    const totalLines = loadedContent.totalLines.trim();
    const lines = generateTailLines(this.tailOptions.count, totalLines );
    this.onCompletion({err: '', lines: lines.join('\n')});
  }

  execute(){
    
    const userArgs = filterUserOptions(this.cmdArgs);
    this.tailOptions = parseOptions(userArgs);
    if (this.tailOptions.err) {
      this.onCompletion({err: this.tailOptions.err, lines: ''});
      return;
    }
    
    const reader = pickReader(this.tailOptions.filePath, this.readers);
    reader.setEncoding('utf8');
    const filePath = this.tailOptions.filePath;
    loadTailLines(filePath, reader, this.onLoadingLines.bind(this));
  }

}

module.exports = {
  CmdLineTool,
  pickReader
};
