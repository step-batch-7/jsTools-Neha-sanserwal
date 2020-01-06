const assert = require('chai').assert;
const {tailOptions} = require('../src/taliOptions');

describe('tailOptions', function(){
  describe('lineCount', function(){
    it('should give count of tail options', function(){
      const opt = new tailOptions({count: 1});
      assert.strictEqual(opt.lineCount, 1);
    });
  });
  describe('file', function(){
    it('should give file of tail options', function(){
      const opt = new tailOptions({filePath: 'myFile'});
      assert.strictEqual(opt.file, 'myFile');
    });
  });
});
