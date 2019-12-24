const generateTailLines = function(contentAndCount) {
	let lines = contentAndCount.lines.split("\n");
	let count = contentAndCount.count || 10;
	let slicedLines = lines.reverse().slice(0, count);
	return slicedLines.reverse();
};

const loadFileContent = function(filePath, reader) {
	let lines = reader(filePath, "utf8");
	return lines;
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
	parseTailOption
};
