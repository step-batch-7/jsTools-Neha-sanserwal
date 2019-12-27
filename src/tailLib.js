"use strict";
const fileErrors = {
	fileName: "",
	get EACCES() {
		return `${this.fileName}: Permission denied`;
	},
	get ENOENT() {
		return `${this.fileName}: No such file or directory`;
	},
	EISDIR: ""
};

const generateTailLines = function(count, lines) {
	let splittedLines = lines.split("\n");
	let slicedLines = splittedLines.reverse().slice(0, count);
	return slicedLines.reverse();
};

const readErrorAndContent = function(err, content) {
	if (err) {
		fileErrors.fileName = this.tailOptions.filePath;
		let endResult = { err: `tail: ${fileErrors[err.code]}`, lines: "" };
		this.displayEndResult(endResult);
		return;
	}

	let lines = generateTailLines(this.tailOptions.count, content.trim());
	this.displayEndResult({ lines: lines.join("\n"), err: "" });
	return;
};

const loadFileLines = function(tailOptions, reader, displayEndResult) {
	reader(
		tailOptions.filePath,
		"utf8",
		readErrorAndContent.bind({ tailOptions, displayEndResult })
	);
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
	let [, , ...userOption] = cmdArgs;
	return userOption;
};

module.exports = {
	generateTailLines,
	loadFileLines,
	filterUserOptions,
	parseTailOptions,
	isOptionCount,
	readErrorAndContent
};
