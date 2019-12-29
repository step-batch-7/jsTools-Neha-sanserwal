const parseOffset = function(num) {
  if (isNaN(parseInt(num))) {
    return { err: `tail: illegal offset -- ${num}`, count: '' };
  }
  return { err: '', count: `${num}` };
};

const isOffsetAttached = function(option){
  return option.length > 2 && option.includes('-n');
};

const isOffsetSeparate = function(option){
  return option.length < 3 && option.includes('-n')
};

const parseN = function(options) {
  const [option, offset, filePath] = options;
  if (isOffsetAttached(option)) {
    return { ...parseOffset(option.slice(2)), filePath: offset };
  }
  if (isOffsetSeparate(option)) {
    return { ...parseOffset(offset), filePath };
  }
  return { ...parseOffset(option), filePath: offset };
};

const isAOption = function(arg){
  const count = parseInt(arg);
  return arg.startsWith('-')||arg.startsWith('+') || Number.isInteger(count);
};
const isACountOption = function(arg){
  const count = parseInt(arg);
  return arg.startsWith('-n') || Number.isInteger(count) ;
};
const parseOptions = function(userArgs){
  const [option] = userArgs;
  if(!isAOption(option)){
    return {err: '', filePath: option, count: 10};
  }
  if(!isACountOption(option)){
    const usage = 'tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
    const err = `tail: illegal option -- ${option.slice(1, 2)}\nusage: ${usage}`;
    return {err, filePath: '', count: '' };
  }
  return parseN(userArgs);

};


module.exports = {
  parseOffset,
  parseN,
  parseOptions
};

