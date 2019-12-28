const assert = require('chai').assert;
const {
  generateTailLines,
  filterUserOptions,
  parseTailOptions,
  readErrorAndContent
} = require('../src/tailLib');

describe('generateTailLines', function() {
  it('should give last ten line of file content if lines are more than 10', function() {
    let lines = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    let expected = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    assert.deepStrictEqual(generateTailLines(10, lines), expected);
  });
  it('should give last total line of file content if lines are less than 10', function() {
    let lines = '1\n2\n3\n4\n5';
    let expected = ['1', '2', '3', '4', '5'];
    assert.deepStrictEqual(generateTailLines(10, lines), expected);
  });
  it('should give last total line of file content if tail count is given', function() {
    let lines = '1\n2\n3\n4\n5';
    let expected = ['3', '4', '5'];
    assert.deepStrictEqual(generateTailLines(3, lines), expected);
  });
});

describe('parseTailOptions', function() {
  it('should do move array of user Option to Object with Valid key if only file is given', function() {
    let userOption = ['sample.txt'];
    let tailOption = { filePath: 'sample.txt', count: 10 };

    assert.deepStrictEqual(parseTailOptions(userOption), tailOption);
  });
  it('should do move array of user Option to Object with Valid key if count is also given', function() {
    let userOption = ['-n', '5', 'sample.txt'];
    let tailOption = { filePath: 'sample.txt', count: 5 };
    parseTailOptions(userOption);
    assert.deepStrictEqual(parseTailOptions(userOption), tailOption);
  });
});

describe('filterUserOptions', function() {
  it('should filter The user Option', function() {
    let cmdArgs = ['node', 'tail.js', 'sample.txt'];
    let userOption = ['sample.txt'];
    assert.deepStrictEqual(filterUserOptions(cmdArgs), userOption);
    cmdArgs = ['node', 'tail.js', 'sample.txt', 'a', 'b'];
    userOption = ['sample.txt', 'a', 'b'];
    assert.deepStrictEqual(filterUserOptions(cmdArgs), userOption);
  });
});

describe('readErrorAndContent', function() {
  it('should display error if error is present', function() {
    const displayEndResult = function(endResult) {
      assert.strictEqual(endResult.err, 'tail: a: Permission denied');
      assert.strictEqual(endResult.lines, '');
    };

    assert.strictEqual(
      readErrorAndContent.call(
        {
          tailOptions: { count: 1, filePath: 'a' },
          displayEndResult
        },
        { code: 'EACCES' },
        'a,b,c'
      )
    );
  });
  it('should display result if error is not present', function() {
    const displayEndResult = function(endResult) {
      assert.strictEqual(endResult.err, '');
      assert.strictEqual(endResult.lines, 'a,b,c');
    };
    assert.strictEqual(
      readErrorAndContent.call(
        {
          tailOptions: { count: 1, filePath: 'a' },
          displayEndResult
        },
        null,
        'a,b,c'
      )
    );
  });
});
