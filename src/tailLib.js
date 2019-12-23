const generateTailLines = function(contentAndCount) {
	let lines = contentAndCount.data.split("\n");
	let count = contentAndCount.count || 10;
	let slicedLines = lines.reverse().slice(0, count);
	return slicedLines.reverse().join("\n");
};
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

const loadFileContent = function(tailOption, reader) {
	tailOption.data = reader(tailOption.filePath, "utf8");
	return tailOption;
};

const parseTailOption = function(userOption) {
	if (userOption[0] === "-n") {
		count = Math.abs(userOption[1]);
		filePath = userOption[2];
		return { filePath, count };
	}
	return { filePath: userOption[0], count: 10 };
};

const filterUserOption = function(cmdArgs) {
	let [, , ...userOption] = [...cmdArgs];
	return userOption;
};

module.exports = {
	generateTailLines,
	loadFileContent,
	filterUserOption,
	parseTailOption,
	generateErrorMessage
};
