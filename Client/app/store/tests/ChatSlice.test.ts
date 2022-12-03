import {Chat, EditingMessage, message, userInfo} from "../types"
import ChatReducer, {
	removeLoadingMessageId,
	resetChatSlice,
	setCurrentChatId,
	setCurrentMemberInfo,
	setCurrentMemberOnline,
	setEditingMessage, setLoadingMessageId
} from "../ChatSlice"
import {expect} from "expect"

interface initialStateType {
	chats: Chat[]
	currentChat: {
		memberInfo: userInfo
		messages: message[]
	}
	currentChatId: number | null
	editingMessage: EditingMessage
	loadingMessagesIds: number[]
}

const initialState = {
	chats: [],
	currentChat: {
		memberInfo: {
			firstName: "",
			lastName: null,
			profilePic: null,
			userBio_id: 0,
			user_id: 0,
			email: "",
			lastOnline: null
		},
		messages: []
	},
	currentChatId: null,
	editingMessage: {
		content: "",
		id: null
	},
	loadingMessagesIds: [] //messages that are being deleted or edited currently

} as initialStateType


const mockedState = {
	chats: [],
	currentChat: {
		memberInfo: {
			firstName: "Artem",
			lastName: null,
			profilePic: null,
			userBio_id: 1,
			user_id: 1,
			email: "noruto@email.com",
			lastOnline: null
		},
		messages: []
	},
	currentChatId: null,
	editingMessage: {
		content: "",
		id: null
	},
	loadingMessagesIds: [1, 2, 3] //messages that are being deleted or edited currently


} as initialStateType

describe("ChatSlice", () => {
	it("should return initial state when action is empty", function () {
		const result = ChatReducer(undefined, {type: ""})
		expect(result).toEqual(initialState)
	})
	it("should set currentChatId with action 'setCurrentChatId'", function () {
		const action = {
			type: setCurrentChatId.type,
			payload: {
				chatId: 1
			},
		}

		const result = ChatReducer(initialState, action)

		expect(result.currentChatId).toBe(1)
	})
	it("should set memberInfo with action 'setCurrentMemberInfo' ", function () {
		const payload = {
			firstName: "Artem",
			lastName: null,
			profilePic: null,
			userBio_id: 1,
			user_id: 1,
			email: "noruto@email.com",
			lastOnline: null
		}
		const action = {
			type: setCurrentMemberInfo.type,
			payload
		}

		const result = ChatReducer(initialState, action)

		expect(result.currentChat.memberInfo).toEqual(payload)
	})
	it("should set lastOnline to 0 min with action 'setCurrentMemberOnline' ", function () {
		const payload = new Date().toString()
		const action = {
			type: setCurrentMemberOnline.type,
			payload
		}
		const result = ChatReducer(initialState, action)

		expect(result.currentChat.memberInfo.lastOnline).toBe("0")
	})

	it("should set setEditingMessage with action 'setEditingMessage' ", function () {
		const payload = {
			content: "hello",
			id: 1
		}
		const action = {
			type: setEditingMessage.type,
			payload
		}

		const result = ChatReducer(initialState, action)

		expect(result.editingMessage).toEqual(payload)
	})
	it("should set loadingMessageIds with action 'setLoadingMessageId' ", function () {

		const action1 = {
			type: setLoadingMessageId.type,
			payload: 1
		}
		const action2 = {
			type: setLoadingMessageId.type,
			payload: 2
		}

		const state1 = ChatReducer(initialState, action1)
		const state2 = ChatReducer(state1, action2)

		expect(state2.loadingMessagesIds).toEqual([1, 2])
	})
	it("should reset currentChat with action 'resetCurrentChat' ", function () {

		const action = {
			type: resetChatSlice.type,

		}

		const result = ChatReducer(mockedState, action)

		expect(result.currentChat).toEqual(initialState.currentChat)
	})
	it("should remove loadingMessageId with action 'removeLoadingMessageId' ", function () {

		const action = {
			type: removeLoadingMessageId.type,
		}

		const result = ChatReducer(mockedState, action)

		expect(result.loadingMessagesIds).toEqual(initialState.loadingMessagesIds)
	})
	it("should reset ChatSlice with action 'resetChatSlice' ", function () {

		const action = {
			type: resetChatSlice.type,
		}

		const result = ChatReducer(mockedState, action)

		expect(result).toEqual(initialState)
	})
})
