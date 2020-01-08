class FileErrors {
  constructor(filePath){
    this.path = filePath;
    this.EISDIR = '';
  }
  get EACCES(){
    return `tail: ${this.path}: Permission denied`;
  }
  get ENOENT(){
    return `tail: ${this.path}: No such file or directory`;
  }
  generateError(errCode){
    return this[errCode];
  }
}

class LineAccumulator {
  constructor(){
    this.totalLines = [];
  }
  append(line){
    this.totalLines.push(line);
  }
  get allLines(){
    return this.totalLines.join('');
  }

}

const loadTailLines = function(path, reader, onLoadingLines){
  const accumulator = new LineAccumulator();
  
  reader.on('data', (data) => {
    accumulator.append(data);
  });

  reader.on('end', () => {
    onLoadingLines({totalLines: accumulator.allLines, err: ''});
  });

  reader.on('error', (err) => {
    const error = new FileErrors(path);
    onLoadingLines({totalLines: '', err: error.generateError(err.code)});
  });
};

module.exports = {
  loadTailLines
};
