class tailOptions {
  constructor (options) {
    this.count = options.count;
    this.file = options.filePath;
  }
  get lineCount () {
    return this.count;
  }

  get filePath () {
    return this.file;
  }
}

module.exports = { tailOptions };
