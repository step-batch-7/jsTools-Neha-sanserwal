const assert = require("chai").assert;
const {
	generateTailLines,
	loadFileContent,
	filterUserOption,
	parseTailOption
} = require("../src/lib");

describe("generateTailLines", function() {
	it("should give last ten line of file content if lines are more than 10", function() {
		let data = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11";
		let fileContent = { data };
		let expected = "2\n3\n4\n5\n6\n7\n8\n9\n10\n11";
		assert.strictEqual(generateTailLines(fileContent), expected);
	});
	it("should give last total line of file content if lines are less than 10", function() {
		let data = "1\n2\n3\n4\n5";
		let fileContent = { data };
		let expected = "1\n2\n3\n4\n5";
		assert.strictEqual(generateTailLines(fileContent), expected);
	});
});

describe("loadFileContent", function() {
	it("should load file content", function() {
		let data = "1\n2\n3";
		let fileContent = { data };
		let tailOptions = { filePath: "sample.txt" };
		const reader = function(path) {
			assert.deepStrictEqual(path, "sample.txt");
			return "1\n2\n3";
		};
		const encoding = "utf8";
		assert.deepStrictEqual(
			loadFileContent(tailOptions, reader, encoding),
			fileContent
		);
	});
});

describe("parseTailOption", function() {
	it("should do move array of user Option to Object with Valid key", function() {
		let userOption = ["sample.txt"];
		let tailOption = { filePath: "sample.txt" };
		assert.deepStrictEqual(parseTailOption(userOption), tailOption);
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
