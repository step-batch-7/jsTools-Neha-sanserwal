const generateTailLines = function(contentAndCount) {
	let lines = contentAndCount.data.split("\n");
	let count = contentAndCount.count || 10;
	let slicedLines = lines.reverse().slice(0, count);
	return slicedLines.reverse().join("\n");
};

const generateErrorMessage = function(errMessage) {
	return `tail: ${errMessage.type}: ${errMessage.message}`;
};

const loadFileContent = function(tailOption, reader, encoding) {
	tailOption.data = reader(tailOption.filePath, encoding);
	return tailOption;
};

const parseTailOption = function(userOption) {
	if (userOption[0] === "-n") {
		count = Math.abs(userOption[1]);
		filePath = userOption[2];
		return { filePath, count };
	}
	return { filePath: userOption[0] };
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
