const assert = require("chai").assert;
const { manageTailOperation } = require("../src/manageTailOperation");
const { fsModules } = require("../src/config");
describe("manageTailOperation", function() {
	it("should give error if can't generate tail lines of given file", function() {
		let cmdArgs = ["node", "tail.js", "bad"];
		let expected = "tail: bad: no such file or directory";
		assert.strictEqual(manageTailOperation(cmdArgs, fsModules), expected);
	});
	it("should generate tail lines of given file", function() {
		let cmdArgs = ["node", "tail.js", "sample.txt"];
		let expected = "2\n3\n4\n5\n6\n7\n8\n9\n10\n11";
		assert.strictEqual(manageTailOperation(cmdArgs, fsModules), expected);
	});
});
