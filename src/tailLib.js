"use strict";
const generateTailLines = function(contentAndCount) {
	let lines = contentAndCount.lines.split("\n");
	let count = contentAndCount.count || 10;
	let slicedLines = lines.reverse().slice(0, count);
	return slicedLines.reverse();
};

const loadFileContent = function(filePath, reader) {
	return reader(filePath, "utf8");
};

const parseTailOptions = function(userOption) {
	if (userOption[0] === "-n") {
		let count = Math.abs(userOption[1]);
		let filePath = userOption[2];
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
	parseTailOptions
};
