const assert = require('chai').assert;
const {
  generateTailLines,
  filterUserOptions,
  parseTailOptions,
  readErrorAndContent
} = require('../src/tailLib');

describe('generateTailLines', function() {
  it('should give last ten line of file content if lines are more than 10', function() {
    const lines = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    const expected = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    assert.deepStrictEqual(generateTailLines('10', lines), expected);
  });
  it('should give last total line of file content if lines are less than 10', function() {
    const lines = '1\n2\n3\n4\n5';
    const expected = ['1', '2', '3', '4', '5'];
    assert.deepStrictEqual(generateTailLines('10', lines), expected);
  });
  it('should give last total line of file content if tail count is given', function() {
    const lines = '1\n2\n3\n4\n5';
    const expected = ['3', '4', '5'];
    assert.deepStrictEqual(generateTailLines('3', lines), expected);
  });
  it('should give total line of file content if tail count is +1', function() {
    const lines = '1\n2\n3\n4\n5';
    const expected = ['1', '2', '3', '4', '5'];
    assert.deepStrictEqual(generateTailLines('+1', lines), expected);
  });
  it('should give chop first n lines if the number is positively signed', function() {
    const lines = '1\n2\n3\n4\n5';
    const expected = ['4', '5'];
    assert.deepStrictEqual(generateTailLines('+3', lines), expected);
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
          tailOptions: { count: '1', filePath: 'a' },
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
          tailOptions: { count: '1', filePath: 'a' },
          displayEndResult
        },
        null,
        'a,b,c'
      )
    );
  });
});
