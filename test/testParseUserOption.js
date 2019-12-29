
const assert = require('chai').assert;
const { parseOffset, parseN, parseOptions } = require('../src/parseUserOptions');

describe('parseOffset', function() {
  it('should give the err if argument is not a number', function() {
    assert.deepStrictEqual(parseOffset('a'), {
      err: 'tail: illegal offset -- a',
      count: ''
    });
  });
  it('should give the parsed number if number is valid', function() {
    assert.deepStrictEqual(parseOffset('1'), { err: '', count: '1' });
  });
});

describe('parseN', function() {
  it('should set count if option is combined with offset', function() {
    assert.deepStrictEqual(parseN(['-n1', 'ab']), { err: '', count: '1', filePath: 'ab'});
  });
  it('should set error if option is combined with invalid offset', function() {
    assert.deepStrictEqual(parseN(['-na', 'd']), {
      err: 'tail: illegal offset -- a',
      count: '',
      filePath: 'd'
    });
  });
  it('should set count if option is separated from offset', function() {
    assert.deepStrictEqual(parseN(['-n', '1', 'a']), { err: '', count: '1', filePath: 'a' });
  });
  it('should set error if separated offset is not a number', function() {
    assert.deepStrictEqual(parseN(['-n', 'a', 'ab']), {
      err: 'tail: illegal offset -- a',
      count: '',
      filePath: 'ab'
    });
  });
  it('should set count if option is given as offset', function() {
    assert.deepStrictEqual(parseN(['-1', 'abc']), { err: '', count: '-1', filePath: 'abc'});
  });
});
describe('parseOptions', function() {
  it('should give error if  invalid option is given ', function() {
    const usage = 'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
    const expected = {
      err: `tail: illegal option -- a\n${usage}`,
      count: '',
      filePath: ''
    };
    assert.deepStrictEqual(parseOptions(['-a', '1', 'sd']), expected);
  });
  it('should set count if option is valid', function() {
    const expected = {
      err: '',
      count: '-1',
      filePath: 'gh'
    };
    assert.deepStrictEqual(parseOptions(['-n', '-1', 'gh']), expected);
  });
});