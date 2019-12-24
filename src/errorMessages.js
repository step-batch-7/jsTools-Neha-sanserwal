const generateFileError = function(errMsg) {
	if (!(errMsg.type === "file")) {
		return "";
	}
	return `tail: ${errMsg.filePath}: ${errMsg.message}`;
};
const generateOffsetError = function(errMsg) {
	if (!(errMsg.type === "offset")) {
		return "";
	}
	return `tail: ${errMsg.message}`;
};
const generateErrorMessage = function(errMessage) {
	let err = generateFileError(errMessage);
	err = err.concat(generateOffsetError(errMessage));
	return err;
};

module.exports = {
	generateErrorMessage
};
