const assert = require("chai").assert;
const {
	generateTailLines,
	loadFileContent,
	filterUserOption,
	parseTailOptions
} = require("../src/tailLib");

describe("generateTailLines", function() {
	it("should give last ten line of file content if lines are more than 10", function() {
		let lines = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11";
		let fileContent = { lines };
		let expected = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
		assert.deepStrictEqual(generateTailLines(fileContent), expected);
	});
	it("should give last total line of file content if lines are less than 10", function() {
		let lines = "1\n2\n3\n4\n5";
		let fileContent = { lines };
		let expected = ["1", "2", "3", "4", "5"];
		assert.deepStrictEqual(generateTailLines(fileContent), expected);
	});
	it("should give last total line of file content if tail count is given", function() {
		let lines = "1\n2\n3\n4\n5";
		let fileContent = { lines, count: 3 };
		let expected = ["3", "4", "5"];
		assert.deepStrictEqual(generateTailLines(fileContent), expected);
	});
});

describe("loadFileContent", function() {
	it("should load file content", function() {
		let tailOptions = { filePath: "sample.txt" };
		const reader = function(path) {
			assert.deepStrictEqual(path, "sample.txt");
			return "1\n2\n3";
		};
		let expected = "1\n2\n3";
		const encoding = "utf8";
		assert.deepStrictEqual(
			loadFileContent(tailOptions.filePath, reader, encoding),
			expected
		);
	});
});

describe("parseTailOptions", function() {
	it("should do move array of user Option to Object with Valid key if only file is given", function() {
		let userOption = ["sample.txt"];
		let tailOption = { filePath: "sample.txt", count: 10 };

		assert.deepStrictEqual(parseTailOptions(userOption), tailOption);
	});
	it("should do move array of user Option to Object with Valid key if count is also given", function() {
		let userOption = ["-n", "5", "sample.txt"];
		let tailOption = { filePath: "sample.txt", count: 5 };
		parseTailOptions(userOption);
		assert.deepStrictEqual(parseTailOptions(userOption), tailOption);
	});
});

describe("filterUserOption", function() {
	it("should filter The user Option", function() {
		let cmdArgs = ["node", "tail.js", "sample.txt"];
		let userOption = ["sample.txt"];
		assert.deepStrictEqual(filterUserOption(cmdArgs), userOption);
		cmdArgs = ["node", "tail.js", "sample.txt", "a", "b"];
		userOption = ["sample.txt", "a", "b"];
		assert.deepStrictEqual(filterUserOption(cmdArgs), userOption);
	});
});
