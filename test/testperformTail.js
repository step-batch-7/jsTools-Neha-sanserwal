const assert = require('chai').assert;
const { tail } = require('../src/performTail');

describe('tail', function() {
  it('should give error if the options are not valid', function() {
    let fs = {};
    let cmdArgs = ['node', 'tail.js', '-n', 'a'];
    let displayEndResult = function(endResult) {
      assert.strictEqual(endResult.err, 'tail: illegal offset -- a');
      assert.strictEqual(endResult.lines, '');
    };
    assert.deepStrictEqual(tail(cmdArgs, fs, displayEndResult));

    fs = {};
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
    const cmdArgs = ['node', 'tail.js', 'bad'];
    const fs = {};

    const displayEndResult = function(endResult) {
      assert.deepStrictEqual(
        endResult.err,
        'tail: bad: No such file or directory'
      );
      assert.strictEqual(endResult.lines, '');
    };
    fs.readFile = function(filePath, encoding) {
      assert.strictEqual(filePath, 'bad');
      assert.strictEqual(encoding, 'utf8');
    };
    assert.deepStrictEqual(tail(cmdArgs, fs, displayEndResult));
  });
  it('should generate tail lines of given file', function() {
    const fs = {};

    const displayEndResult = function(endResult) {
      assert.strictEqual(endResult.lines, '1\2\n3');
    };
    fs.readFile = function(filePath, encoding) {
      assert.strictEqual(filePath, 'sample.txt');
      assert.strictEqual(encoding, 'utf8');
    };

    const cmdArgs = ['node', 'tail.js', 'sample.txt'];
    assert.strictEqual(tail(cmdArgs, fs, displayEndResult));
  });
});
