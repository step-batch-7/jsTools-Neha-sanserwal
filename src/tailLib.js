"use strict";
const generateTailLines = function(tailOptions, lines) {
	let splittedLines = lines.split("\n");
	let count = tailOptions.count;
	let slicedLines = splittedLines.reverse().slice(0, count);
	return slicedLines.reverse();
};

const loadFileLines = function(filePath, reader) {
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

const filterUserOptions = function(cmdArgs) {
	let [, , ...userOption] = [...cmdArgs];
	return userOption;
};

module.exports = {
	generateTailLines,
	loadFileLines,
	filterUserOptions,
	parseTailOptions
};
