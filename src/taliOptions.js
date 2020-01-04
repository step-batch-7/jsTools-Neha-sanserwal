class tailOptions{
  constructor(){
    this.count = 10;
    this.file = '';
  }
  get lineCount (){
    return this.count;
  }
}

module.exports = {tailOptions};
