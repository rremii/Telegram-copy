import {cutStringToLength} from "./cutStringToLength"
import {expect} from "expect"

describe("cutStringToLength function", () => {
	it("should return a string with length of 15 and 3 dots in the end", function () {
		const string = "some long string some long string"
		expect(cutStringToLength(string, 15)).toHaveLength(18)
		expect(cutStringToLength(string, 15)).toBe("some long string...")
	})
	it("should return initial string", function () {
		const string = "some short one"
		expect(cutStringToLength(string, 15)).toHaveLength(14)
		expect(cutStringToLength(string, 15)).toBe("some short one")
	})
})
