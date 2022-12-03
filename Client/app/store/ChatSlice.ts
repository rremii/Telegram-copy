import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Chat, EditingMessage, message, userInfo} from "./types"
import {ChatResponse} from "../api/types"


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

const ChatSlice = createSlice({
	name: "ChatSlice",
	initialState,
	reducers: {
		setCurrentChatId(state, action: PayloadAction<ChatResponse>) {
			state.currentChatId = action.payload.chatId
		},
		setCurrentMemberInfo(state, action: PayloadAction<Omit<userInfo, "lastOnline">>) {
			const prevOnline = state.currentChat.memberInfo.lastOnline
			state.currentChat.memberInfo = {...action.payload, lastOnline: prevOnline}
		},
		setCurrentMemberOnline(state, action: PayloadAction<string>) {
			const lastOnline = action.payload
			const date = new Date(lastOnline).getTime()

			state.currentChat.memberInfo.lastOnline = "" + Math.round((Date.now() - date) / (1000 * 60))
		},
		setEditingMessage(state, action: PayloadAction<EditingMessage>) {
			state.editingMessage = action.payload
		},

		setLoadingMessageId(state, action: PayloadAction<number>) {
			state.loadingMessagesIds.push(action.payload)

		},
		resetEditingMessage(state) {
			state.editingMessage = {id: null, content: ""}
		},
		resetCurrentChat(state) {
			state.currentChatId = null
			state.currentChat = {
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
			}
		},
		removeLoadingMessageId(state,) {
			state.loadingMessagesIds = []
		},

		resetChatSlice() {
			return initialState
		}
	},

})
export const {
	resetChatSlice,
	setEditingMessage,
	setCurrentChatId,
	setCurrentMemberOnline,
	setCurrentMemberInfo,
	resetEditingMessage,
	setLoadingMessageId,
	removeLoadingMessageId,
	resetCurrentChat
} = ChatSlice.actions
export default ChatSlice.reducer
