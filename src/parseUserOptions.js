const validationErrors = {
  optionErr: function(option) {
    const usage = 'tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
    return `tail: illegal option -- ${option}\nusage: ${usage}`;
  },
  offsetErr: function(offset) {
    return `tail: illegal offset -- ${offset}`;
  },
  usageErr: function(option) {
    const usage = 'tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
    return `tail: option requires an argument -- ${option}\nusage: ${usage}`;
  }
};

const parseOffset = function(num) {
  if (!num) {
    return {err: validationErrors.usageErr('n'), count: ''};
  }
  if (isNaN(parseInt(num))) {
    return {err: validationErrors.offsetErr(num), count: ''};
  }
  return {err: '', count: `${num}`};
};

const isOffsetAttached = function(option) {
  const optLength = 2;
  return option.length > optLength && option.startsWith('-n');
};

const isOffsetSeparate = function(option) {
  const optLength = 3;
  return option.length < optLength && option.startsWith('-n');
};

const parseN = function(options) {
  const [option, offset, filePath] = options;
  if (isOffsetAttached(option)) {
    const [, , ...newOffset] = option;
    return {...parseOffset(newOffset.join('')), filePath: offset};
  }
  if (isOffsetSeparate(option)) {
    return {...parseOffset(offset), filePath};
  }
  return {...parseOffset(option), filePath: offset};
};

const isAOption = function(arg) {
  if (!arg) {
    return false;
  }
  const count = parseInt(arg);
  return arg.startsWith('-') || arg.startsWith('+') || Number.isInteger(count);
};

const isACountOption = function(arg) {
  const count = parseInt(arg);
  return arg.startsWith('-n') || Number.isInteger(count);
};

const parseOptions = function(userArgs) {
  const [option] = userArgs;
  if (!isAOption(option)) {
    return {err: '', filePath: option, count: '10'};
  }

  if (!isACountOption(option)) {
    const [, illegalOpt] = option;
    const err = validationErrors.optionErr(illegalOpt);
    return {err, filePath: '', count: ''};
  }
  return parseN(userArgs);
};

module.exports = {
  parseOffset,
  parseN,
  isACountOption,
  isAOption,
  isOffsetAttached,
  isOffsetSeparate,
  parseOptions
};
