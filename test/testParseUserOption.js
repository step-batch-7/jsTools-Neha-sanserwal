const assert = require('chai').assert;
const { parseOffset, 
  isOffsetAttached,
  isOffsetSeparate,
  parseN, 
  parseOptions,
  isAOption,
  isACountOption} = require('../src/parseUserOptions');

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

describe('isOffsetSeparate', function(){
  it('should validate if option only contains -n', function(){
    assert.ok(isOffsetSeparate('-n'));
  });
  it('should invalidate if option contains more characters than -n', function(){
    assert.notOk(isOffsetSeparate('-n123'));
    assert.notOk(isOffsetSeparate('-na'));
  });
  it('should invalidate if option is not a count Option', function(){
    assert.notOk(isOffsetSeparate('-q12'));
    assert.notOk(isOffsetSeparate('-q'));
  });
});

describe('isOffsetAttached', function(){
  it('should validate if option contains offset with count option', function(){
    assert.ok(isOffsetAttached('-n12'));
    assert.ok(isOffsetAttached('-nab'));
  });
  it('should invalidate if it only count option', function(){
    assert.notOk(isOffsetAttached('-n'));
    assert.notOk(isOffsetAttached('-n'));
  });
  it('should invalidate if option is not a count Option', function(){
    assert.notOk(isOffsetAttached('-q12'));
    assert.notOk(isOffsetAttached('-q'));
  });
});

describe('parseN', function() {
  it('should set count if option is combined with offset', function() {
    const expected = { err: '', count: '1', filePath: 'ab'};
    assert.deepStrictEqual(parseN(['-n1', 'ab']), expected);
  });

  it('should set error if option is combined with invalid offset', function() {
    assert.deepStrictEqual(parseN(['-na', 'd']), {
      err: 'tail: illegal offset -- a',
      count: '',
      filePath: 'd'
    });
  });

  it('should set count if option is separated from offset', function() {
    const expected = { err: '', count: '1', filePath: 'a'};
    assert.deepStrictEqual(parseN(['-n', '1', 'a']), expected);
  });

  it('should set error if separated offset is not a number', function() {
    assert.deepStrictEqual(parseN(['-n', 'a', 'ab']), {
      err: 'tail: illegal offset -- a',
      count: '',
      filePath: 'ab'
    });
  });

  it('should set count if option is given as offset', function() {
    const expected = { err: '', count: '-1', filePath: 'abc'};
    assert.deepStrictEqual(parseN(['-1', 'abc']), expected);
  });
});
describe('isAOption', function(){
  it('should invalidate is the option is undefined', function(){
    assert.notOk(isAOption(undefined));
  });

  it('should invalidate if input is not preceded by hyphen or plus', function(){
    assert.ok(isAOption('-a'));
    assert.ok(isAOption('-1'));
    assert.ok(isAOption('+1'));
    assert.ok(isAOption('+a'));
  });

  it('should validate if input is a number ', function(){
    assert.ok(isAOption('12'));
  });
});
describe('isACountOption', function(){
  it('should validate if input is preceded by -n', function(){
    assert.ok(isACountOption('-n1'));
    assert.ok(isACountOption('-n'));
    assert.ok(isACountOption('-na'));
  });

  it('should validate if input is a number ', function(){
    assert.ok(isAOption('+12'));
    assert.ok(isAOption('-12'));
    assert.ok(isAOption('12'));
  });

});

describe('parseOptions', function() {
  it('should give error if  invalid option is given ', function() {
    const usage = 'tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
    const expected = {
      err: `tail: illegal option -- a\nusage: ${usage}`,
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
