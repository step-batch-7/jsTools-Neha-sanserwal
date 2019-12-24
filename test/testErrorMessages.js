const assert = require("chai").assert;
const { generateErrorMessage } = require("../src/errorMessages");
describe("generateErrorMessage", function() {
	it("should generate error message of file type", function() {
		const errorMessage = {
			type: "file",
			message: "no such file or directory",
			filePath: "badFile.txt"
		};
		assert.deepStrictEqual(
			generateErrorMessage(errorMessage),
			"tail: badFile.txt: no such file or directory"
		);
	});
	it("should generate error message of offset type", function() {
		const errorMessage = {
			type: "offset",
			message: "illegal offset -- a"
		};
		let message = `tail: illegal offset -- a`;
		assert.strictEqual(generateErrorMessage(errorMessage), message);
	});
});
