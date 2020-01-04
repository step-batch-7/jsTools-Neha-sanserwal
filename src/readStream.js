const fileErrors = {
  EACCES: function (fileName) {
    return `tail: ${fileName}: Permission denied`;
  },
  ENOENT: function (fileName) {
    return `tail: ${fileName}: No such file or directory`;
  },
  EISDIR: ''
};
const appendLine = function(data){
  this.totalLines = this.totalLines.concat(data);
};

const loadTailLines = function(path, reader, onLoadingLines){
  const totalLines = '';
  reader.on('data', appendLine.bind(totalLines));
  reader.on('end', () => {
    onLoadingLines({totalLines: totalLines.trim(), err: ''});
  });
  reader.on('error', (err) => {
    onLoadingLines({totalLines: '', err: fileErrors[err.code](path)});
  });
};
module.exports = {loadTailLines}; 
