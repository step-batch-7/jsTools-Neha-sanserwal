const assert = require('chai').assert;
const sinon = require('sinon');
const { tail } = require('../src/performTail');

describe('tail', function() {
  it('should give error if the options are not valid', function(done) {
    const fs = {};
    const stdin = {};
    let cmdArgs = ['node', 'tail.js', '-n', 'a'];
    let onCompletion = function(endResult) {
      assert.strictEqual(endResult.err, 'tail: illegal offset -- a');
      assert.strictEqual(endResult.lines, '');
      done();
    };
    assert.deepStrictEqual(tail(cmdArgs, {fs, stdin}, onCompletion));
    cmdArgs = ['node', 'tail.js', '-a'];
    onCompletion = function(endResult) {
      const usage = 'tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
      const err = `tail: illegal option -- a\nusage: ${usage}`;
      assert.strictEqual(endResult.err, err);
      assert.strictEqual(endResult.lines, '');
    };
    assert.deepStrictEqual(tail(cmdArgs, fs, stdin, onCompletion));
  });

  it('should give error if cannot find given file', function(done) {
    const fs = {};
    const stdin = {};
    const reader= {setEncoding: sinon.fake(), on: sinon.fake() };
    
    fs.createReadStream = function(path){
      assert.strictEqual(path, 'bad');
      return reader;
    };
    const onCompletion = function(endResult) {
      const err = 'tail: bad: No such file or directory';
      assert.deepStrictEqual(endResult.err, err);
      assert.strictEqual(endResult.lines, '');
      done();
    };
  
    const cmdArgs = ['node', 'tail.js', 'bad'];
    tail(cmdArgs, {fs, stdin}, onCompletion);
    assert.strictEqual(reader.on.firstCall.args[0], 'data');
    assert.strictEqual(reader.on.secondCall.args[0], 'end');
    assert.strictEqual(reader.on.callCount, 3);
    reader.on.thirdCall.args[1]({code:'ENOENT'})
  });

  it('should generate tail lines of given file', function(done) {
    const fs = {};
    const stdin = {};
    const reader= {setEncoding: sinon.fake(), on: sinon.fake() };
    
    fs.createReadStream = function(path){
      assert.strictEqual(path, 'good');
      return reader;
    };
    const onCompletion = function(endResult) {
      assert.deepStrictEqual(endResult.err, '');
      assert.strictEqual(endResult.lines, 'a\nb\nc');
      done();
    };
  
    const cmdArgs = ['node', 'tail.js', 'good'];
    tail(cmdArgs, {fs, stdin}, onCompletion);
    assert.strictEqual(reader.on.firstCall.args[0], 'data');
    assert.strictEqual(reader.on.secondCall.args[0], 'end');
    assert.strictEqual(reader.on.callCount, 3);
    reader.on.firstCall.args[1]('a\nb\nc');
    reader.on.secondCall.args[1]();
  });

  it('should load the lines from stdin when file is not given', function(done) {
    const fs = {};
    const stdin = {setEncoding: sinon.fake(), on: sinon.fake() };
    const onCompletion = function(endResult) {
      assert.strictEqual(endResult.lines, 'abc');
      done();
    };
    const cmdArgs = ['node', 'tail.js'];
    tail(cmdArgs, {fs, stdin}, onCompletion);
    assert(stdin.setEncoding.calledWith('utf8'));
    assert.strictEqual(stdin.on.firstCall.args[0], 'data');
    assert.strictEqual(stdin.on.secondCall.args[0], 'end');
    assert.strictEqual(stdin.on.callCount, 3);
    stdin.on.firstCall.args[1]('abc');
    stdin.on.secondCall.args[1]();
  });
});
