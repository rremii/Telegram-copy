import {cutStringToLength} from "./cutStringToLength"
import {expect} from "expect"
import {ParseSearchString} from "./parseSearchString"
import {getStatusByLastOnline} from "./getStatusByLastOnline"
import {getMessageTime} from "./getMessageTime"
import {getMessageDate} from "./getMessageDate"

describe("cutStringToLength function", () => {
	it("should return a string with length of 15 and 3 dots in the end", function () {
		const string = "some long string some long string"
		expect(cutStringToLength(string, 15)).toHaveLength(18)
		expect(cutStringToLength(string, 16)).toBe("some long string...")
	})
	it("should return initial string", function () {
		const string = "some short one"
		expect(cutStringToLength(string, 15)).toHaveLength(14)
		expect(cutStringToLength(string, 15)).toBe("some short one")
	})
})
describe("parseSearchString function", () => {
	it(`should return an object {
				email: "email@email.com",
				firstName: null,
				lastName: null}`, function () {
		const searchString = "email@email.com"
		expect(ParseSearchString(searchString)).toEqual({
			email: "email@email.com",
			firstName: null,
			lastName: null
		})
	})
	it(`should return an object {
				email: null,
				firstName: Artem,
				lastName: Romanov}`,
		function () {
			const searchString = "Artem Romanov"
			expect(ParseSearchString(searchString)).toEqual({
				email: null,
				firstName: "Artem",
				lastName: "Romanov"
			})
		})

})

describe("getStatusByLastOnline func", function () {
	it("should return online", function () {
		expect(getStatusByLastOnline("0.5")).toBe("online")

	})
	it("should return {min} ago", function () {
		expect(getStatusByLastOnline("1")).toBe("1 min ago")
		expect(getStatusByLastOnline("4")).toBe("4 min ago")

	})
	it("should return {hours} ago", function () {
		expect(getStatusByLastOnline("180")).toBe("3 hours ago")

	})
})

describe("getMessageTime func", function () {
	const stringDate = "2022-11-30T19:56:37.745Z"

	it("should return 22:56", function () {
		expect(getMessageTime(stringDate)).toBe("22:56")
	})
})

describe("getMessageDate func", function () {
	//it gives a date of the last message if prev and current messages' dates are different
	const message1 = {
		chat_id: 1,
		chat_message_id: 1,
		content: "hello1",
		isSeen: false,
		createdAt: "2022-11-27T10:04:54.503Z",
		updatedAt: "2022-11-27T10:04:54.503Z",
		sender_id: 1,
	}
	const message2 = {
		chat_id: 1,
		chat_message_id: 1,
		content: "hello1",
		isSeen: false,
		createdAt: "2022-11-27T11:47:11.501Z",
		updatedAt: "2022-11-27T11:47:11.501Z",
		sender_id: 2,
	}
	const message3 = {
		chat_id: 1,
		chat_message_id: 1,
		content: "hello1",
		isSeen: false,
		createdAt: "2022-11-30T19:56:37.449Z",
		updatedAt: "2022-11-30T19:56:37.449Z",
		sender_id: 2,
	}
	it("should return null", function () {
		expect(getMessageDate([message1, message2], 1)).toBe(null)
	})
	it("should return November 30", function () {
		expect(getMessageDate([message1, message3], 1)).toBe("November 30")
	})
})
