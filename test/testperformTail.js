const assert = require("chai").assert;
const { tail } = require("../src/performTail");

describe("tail", function() {
	it("should give error if the options are not valid", function() {
		let fs = {};
		let cmdArgs = ["node", "tail.js", "-n", "a"];
		let expected = {
			err: "tail: illegal offset -- a",
			lines: ""
		};
		assert.deepStrictEqual(tail(cmdArgs, fs), expected);

		fs = {};
		cmdArgs = ["node", "tail.js", "-a"];
		expected = {
			err:
				"tail: illegal option -- a\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]",
			lines: ""
		};
		assert.deepStrictEqual(tail(cmdArgs, fs), expected);
	});
	it("should give error if can't find given file", function() {
		const fs = {};
		fs.existsSync = function(filePath) {
			assert.strictEqual(filePath, "bad");
			return false;
		};
		let cmdArgs = ["node", "tail.js", "bad"];
		let expected = {
			err: "tail: bad: No such file or directory",
			lines: ""
		};
		assert.deepStrictEqual(tail(cmdArgs, fs), expected);
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
			lines: "1\n2\n3"
		};

		assert.deepStrictEqual(tail(cmdArgs, fs), expected);
	});
});
