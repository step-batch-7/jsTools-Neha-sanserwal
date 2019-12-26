const { isOptionCount } = require("./tailLib");
const validateOffset = function(offset) {
	if (!Number.isInteger(parseInt(offset))) {
		return { isValid: false, err: `tail: illegal offset -- ${offset}` };
	}
	return { isValid: true, err: "" };
};

const validateOptionAndOffset = function(option, offset) {
	if (!isOptionCount(option)) {
		return { isValid: false, err: `tail: illegal option -- ${option}` };
	}
	return validateOffset(offset);
};

const isAOption = function(arg) {
	return arg[0] === "-" && arg.length > 1;
};

const validateUserArgs = function(userArgs) {
	let option = userArgs[0];
	if (isAOption(option)) {
		return validateOptionAndOffset(option, userArgs[1]);
	}
	return { isValid: true, err: "" };
};

module.exports = {
	validateUserArgs
};
