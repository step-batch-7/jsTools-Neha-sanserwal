const assert = require("chai").assert;
const { generateTailLines } = require("../src/lib");
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
