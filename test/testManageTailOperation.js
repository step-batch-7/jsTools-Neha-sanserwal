const assert = require("chai").assert;
const { manageTailOperation } = require("../src/manageTailOperation");
describe("manageTailOperation", function() {
	it("should give error if can't find given file", function() {
		const fsModules = {};
		fsModules.encoding = "utf8";
		fsModules.fileExist = function(filePath) {
			assert.strictEqual(filePath, "bad");
			return false;
		};
		let cmdArgs = ["node", "tail.js", "bad"];
		let expected = "tail: bad: no such file or directory";
		assert.strictEqual(manageTailOperation(cmdArgs, fsModules), expected);
	});
	it("should generate tail lines of given file", function() {
		const fsModules = {
			encoding: "utf8"
		};
		fsModules.fileExist = function(filePath) {
			assert.strictEqual(filePath, "sample.txt");
			return true;
		};
		encoding = "utf8";
		fsModules.readFile = function(filePath, encoding) {
			assert.strictEqual(filePath, "sample.txt");
			assert.strictEqual(encoding, "utf8");
			return "1\n2\n3";
		};
		let cmdArgs = ["node", "tail.js", "sample.txt"];
		assert.strictEqual(manageTailOperation(cmdArgs, fsModules), "1\n2\n3");
	});
});
