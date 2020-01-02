const assert = require('chai').assert; 
const {
  generateTailLines,
  filterUserOptions,
} = require('../src/tailLib');

describe('generateTailLines', function() {
  it('should give last ten line if lines are more than 10', function() {
    const lines = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    const expected = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    assert.deepStrictEqual(generateTailLines('10', lines), expected);
  });

  it('should give all lines if total lines are less than 10', function() {
    const lines = '1\n2\n3\n4\n5';
    const expected = ['1', '2', '3', '4', '5'];
    assert.deepStrictEqual(generateTailLines('10', lines), expected);
  });

  it('should give last n line if tail count is given', function() {
    const lines = '1\n2\n3\n4\n5';
    const expected = ['3', '4', '5'];
    assert.deepStrictEqual(generateTailLines('3', lines), expected);
  });

  it('should start from line n-1 if the offset is positive', function() {
    const lines = '1\n2\n3\n4\n5';
    const expected = ['3', '4', '5'];
    assert.deepStrictEqual(generateTailLines('+3', lines), expected);
  });

  it('should give last n lines if the count is negatively signed', function() {
    const lines = '1\n2\n3\n4\n5';
    const expected = ['3', '4', '5'];
    assert.deepStrictEqual(generateTailLines('-3', lines), expected);
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
