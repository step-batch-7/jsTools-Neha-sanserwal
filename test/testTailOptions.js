const assert = require('chai').assert;
const {tailOptions} = require('../src/taliOptions');

describe('tailOptions', function(){
  describe('lineCount', function(){
    it('should give count of tail options initially as 10', function(){
      const opt = new tailOptions();
      assert.strictEqual(opt.lineCount, 10);
    });
  });
  describe('file', function(){
    it('should give file of tail options initially empty', function(){
      const opt = new tailOptions();
      assert.strictEqual(opt.file, '');
    });
  });
});
