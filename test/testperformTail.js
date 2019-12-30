const assert = require('chai').assert;
const sinon = require('sinon');
const fs = require('fs');
const { tail } = require('../src/performTail');

describe('tail', function() {
  it('should give error if the options are not valid', function() {
    const fs = {};
    let cmdArgs = ['node', 'tail.js', '-n', 'a'];
    let displayEndResult = function(endResult) {
      assert.strictEqual(endResult.err, 'tail: illegal offset -- a');
      assert.strictEqual(endResult.lines, '');
    };
    assert.deepStrictEqual(tail(cmdArgs, fs, displayEndResult));
    cmdArgs = ['node', 'tail.js', '-a'];
    displayEndResult = function(endResult) {
      const usage = 'tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
      const err = `tail: illegal option -- a\nusage: ${usage}`;
      assert.strictEqual(endResult.err, err);
      assert.strictEqual(endResult.lines, '');
    };
    assert.deepStrictEqual(tail(cmdArgs, fs, displayEndResult));
  });

  it('should give error if cannot find given file', function() {
   

    const displayEndResult = function(endResult) {
      assert.deepStrictEqual(endResult.err, 'tail: bad: No such file or directory');
      assert.strictEqual(endResult.lines, '');
    };
    const fakeReader = sinon.fake.yieldsAsync({code: 'ENOENT'}, null);
    sinon.replace(fs, 'readFile', fakeReader);

    const cmdArgs = ['node', 'tail.js', 'bad'];
    tail(cmdArgs, fs, displayEndResult);

    assert(fakeReader.calledOnce);
    sinon.restore();
  });
  it('should generate tail lines of given file', function() {
    const displayEndResult = function(endResult) {
      assert.strictEqual(endResult.lines, '1\n2\n3');
    };
   
    const fakeReader = sinon.fake.yieldsAsync(null, '1\n2\n3');
    sinon.replace(fs, 'readFile', fakeReader);

    const cmdArgs = ['node', 'tail.js', 'sample.txt'];
    tail(cmdArgs, fs, displayEndResult);
    assert(fakeReader.calledWith('sample.txt', 'utf8'));
  
    sinon.restore();

  });
});
