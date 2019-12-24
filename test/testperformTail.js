const assert = require("chai").assert;
const { performTail } = require("../src/performTail");
describe("performTail", function() {
	it("should give error if can't find given file", function() {
		const fs = {};
		fs.existsSync = function(filePath) {
			assert.strictEqual(filePath, "bad");
			return false;
		};
		let cmdArgs = ["node", "tail.js", "bad"];
		let expected = {
			err: "tail: bad: no such file or directory",
			lines: []
		};
		assert.deepStrictEqual(performTail(cmdArgs, fs), expected);
	});
	it("should generate tail lines of given file", function() {
		const fs = {};
		fs.existsSync = function(filePath) {
			assert.strictEqual(filePath, "sample.txt");
			return true;
		};
		fs.readFileSync = function(filePath, encoding) {
			assert.strictEqual(filePath, "sample.txt");
			assert.strictEqual(encoding, "utf8");
			return "1\n2\n3";
		};
		let cmdArgs = ["node", "tail.js", "sample.txt"];
		let expected = {
			err: "",
			lines: ["1", "2", "3"]
		};

		assert.deepStrictEqual(performTail(cmdArgs, fs), expected);
	});
});
