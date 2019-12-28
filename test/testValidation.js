const assert = require('chai').assert;
const { validateUserArgs } = require('../src/validation');
describe('validateUserArgs', function() {
  it('should validate if only file is given', function() {
    let userArgs = ['myFile'];
    assert.deepStrictEqual(validateUserArgs(userArgs), {
      isValid: true,
      err: ''
    });
    userArgs = ['-'];
    assert.deepStrictEqual(validateUserArgs(userArgs), {
      isValid: true,
      err: ''
    });
  });
  it('should invalidate if the offset of valid option is invalid', function() {
    let userArgs = ['-n', 'myFile'];
    assert.deepStrictEqual(validateUserArgs(userArgs), {
      isValid: false,
      err: 'tail: illegal offset -- myFile'
    });
    userArgs = ['-n', '-s'];
    assert.deepStrictEqual(validateUserArgs(userArgs), {
      isValid: false,
      err: 'tail: illegal offset -- -s'
    });
  });
  it('should invalidate if the option is invalid', function() {
    let userArgs = ['-a', 'myFile'];
    assert.deepStrictEqual(validateUserArgs(userArgs), {
      isValid: false,
      err: 'tail: illegal option -- a\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
    });
    userArgs = ['-l', 'myFile'];
    assert.deepStrictEqual(validateUserArgs(userArgs), {
      isValid: false,
      err: 'tail: illegal option -- l\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
    });
  });
  it('should validate if the offset of valid option is valid', function() {
    let userArgs = ['-n', '4'];
    assert.deepStrictEqual(validateUserArgs(userArgs), {
      isValid: true,
      err: ''
    });
    userArgs = ['-n', '0'];
    assert.deepStrictEqual(validateUserArgs(userArgs), {
      isValid: true,
      err: ''
    });
  });
});
