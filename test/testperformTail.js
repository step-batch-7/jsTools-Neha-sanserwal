const assert = require("chai").assert;
const { tail } = require("../src/performTail");

describe("tail", function() {
	it("should give error if the options are not valid", function() {
		let fs = {};
		let cmdArgs = ["node", "tail.js", "-n", "a"];
		let displayEndResult = function(endResult) {
			assert.strictEqual(endResult.err, "tail: illegal offset -- a");
			assert.strictEqual(endResult.lines, "");
		};
		assert.deepStrictEqual(tail(cmdArgs, fs, displayEndResult));

		fs = {};
		cmdArgs = ["node", "tail.js", "-a"];
		displayEndResult = function(endResult) {
			let err = `tail: illegal option -- a\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`;
			assert.strictEqual(endResult.err, err);
			assert.strictEqual(endResult.lines, "");
		};
		assert.deepStrictEqual(tail(cmdArgs, fs, displayEndResult));
	});

	it("should give error if can't find given file", function() {
		const fs = {};
		fs.existsSync = function(filePath) {
			assert.strictEqual(filePath, "bad");
			return false;
		};
		let cmdArgs = ["node", "tail.js", "bad"];
		let displayEndResult = function(endResult) {
			assert.deepStrictEqual(
				endResult.err,
				"tail: bad: No such file or directory"
			);
			assert.strictEqual(endResult.lines, "");
		};

		assert.deepStrictEqual(tail(cmdArgs, fs, displayEndResult));
	});
	it("should generate tail lines of given file", function() {
		const fs = {};
		fs.existsSync = function(filePath) {
			assert.strictEqual(filePath, "sample.txt");
			return true;
		};
		displayEndResult = function(endResult) {
			assert.strictEqual(endResult.lines, "1\2\n3");
		};
		fs.readFile = function(filePath, encoding, writer) {
			assert.strictEqual(filePath, "sample.txt");
			assert.strictEqual(encoding, "utf8");
		};

		let cmdArgs = ["node", "tail.js", "sample.txt"];
		assert.strictEqual(tail(cmdArgs, fs, displayEndResult));
	});
});
