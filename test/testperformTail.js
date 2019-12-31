const assert = require('chai').assert;
const { tail } = require('../src/performTail');

describe('tail', function() {
  it('should give error if the options are not valid', function(done) {
    const fs = {};
    let cmdArgs = ['node', 'tail.js', '-n', 'a'];
    let displayEndResult = function(endResult) {
      assert.strictEqual(endResult.err, 'tail: illegal offset -- a');
      assert.strictEqual(endResult.lines, '');
      done();
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

  it('should give error if cannot find given file', function(done) {
    const fs = {};
    const onCompletion = function(endResult) {
      const err = 'tail: bad: No such file or directory';
      assert.deepStrictEqual(endResult.err, err);
      assert.strictEqual(endResult.lines, '');
      done();
    };
    fs.readFile =function(path, encoding, callback) {
      assert.strictEqual(path, 'bad');
      assert.strictEqual(encoding, 'utf8');
      setTimeout(() => {
        callback({code: 'ENOENT'}, null);
      }, 0);
    };
    const cmdArgs = ['node', 'tail.js', 'bad'];
    tail(cmdArgs, fs, onCompletion);
  });
  it('should generate tail lines of given file', function() {
    const fs = {};
    const displayEndResult = function(endResult) {
      assert.strictEqual(endResult.lines, '1\n2\n3');
    };

    fs.readFile =function(path, encoding, callback) {
      assert.strictEqual(path, 'sample.txt');
      assert.strictEqual(encoding, 'utf8');
      setTimeout(() => {
        callback(null, '1\n2\n3');
      }, 0);
    };

    const cmdArgs = ['node', 'tail.js', 'sample.txt'];
    tail(cmdArgs, fs, displayEndResult);
  });
});
