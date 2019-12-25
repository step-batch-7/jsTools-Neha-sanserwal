"use strict";
const generateTailLines = function(tailOptions, lines) {
	let splittedLines = lines.split("\n");
	let count = tailOptions.count;
	let slicedLines = splittedLines.reverse().slice(0, count);
	return slicedLines.reverse();
};

const loadFileLines = function(filePath, reader) {
	return reader(filePath, "utf8").trim();
};
const isOptionCount = function(option) {
	return option === "-n";
};
const parseTailOptions = function(userOption) {
	if (isOptionCount(userOption[0])) {
		let count = Math.abs(userOption[1]);
		return { filePath: userOption[2], count };
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
	parseTailOptions,
	isOptionCount
};
