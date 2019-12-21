const generateTailLines = function(fileContent) {
	let lines = fileContent.data.split("\n");
	let slicedLines = lines.reverse().slice(0, 10);
	return slicedLines.reverse().join("\n");
};

module.exports = {
	generateTailLines
};
