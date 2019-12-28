const { isOptionCount } = require('./tailLib');

const validateOffset = function(offset) {
  if (!Number.isInteger(parseInt(offset))) {
    return { isValid: false, err: `tail: illegal offset -- ${offset}` };
  }
  return { isValid: true, err: '' };
};

const validateOptionAndOffset = function(option, offset) {
  if (!isOptionCount(option)) {
    const illegalOption = option.slice(1).trim('-');
    const usage = 'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
    const err = `tail: illegal option -- ${illegalOption}\n${usage}`;
    return { isValid: false, err };
  }
  return validateOffset(offset);
};

const isAOption = function(arg) {
  return arg[0] === '-' && arg.length > 1;
};

const validateUserArgs = function(userArgs) {
  const option = userArgs[0];
  if (option && isAOption(option)) {
    return validateOptionAndOffset(option, userArgs[1]);
  }
  return { isValid: true, err: '' };
};

module.exports = {
  validateUserArgs
};
