import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Chat, EditingMessage, message, messageData, userInfo} from "./types"
import {ChatAPI} from "../api/ChatApi"
import {ChatResponse} from "../api/types"


export const findOrCreateChat = createAsyncThunk(
	"ChatSlice/findOrCreateChat",
	async (ids: number[], {rejectWithValue}) => {
		try {

			const response = await ChatAPI.findOrCreateChat(ids)

			return response.data
		} catch (e: any) {
			return rejectWithValue(e.response.data.message)
		}
	}
)

// export const fetchChatsByUserId = createAsyncThunk<Chat[],
// 	number,
// 	{
// 		dispatch: AppDispatch
// 		state: RootState
// 	}>(
// 	"ChatSlice/fetchChatsByUserId",
// 	async (userId: number, {rejectWithValue, dispatch, getState}) => {
// 		try {
//
// 			const response = await ChatAPI.getChatsByUserId(userId)
//
// 			const state = getState()
// 			const {currentChatId} = state.Chats
// 			//updating a chat member online status
// 			if (currentChatId) {
// 				const currentChat = response.data.find(({chat_id}) => chat_id === currentChatId)
// 				if (currentChat?.memberInfo.lastOnline) dispatch(setCurrentMemberOnline(currentChat.memberInfo.lastOnline))
// 			}
//
// 			return response.data
// 		} catch (e: any) {
// 			return rejectWithValue(e.response.data.message)
// 		}
// 	}
// )
export const addMessage = createAsyncThunk(
	"ChatSlice/addMessage",
	async (messageData: messageData, {rejectWithValue}) => {
		try {

			const response = await ChatAPI.addMessage(messageData)

			return response.data
		} catch (e: any) {
			return rejectWithValue(e.response.data.message)
		}
	}
)

export const getAllMessages = createAsyncThunk(
	"ChatSlice/getAllMessages",
	async ({chat_id, user_id}: { chat_id: number, user_id: number }, {rejectWithValue}) => {
		try {
			const response = await ChatAPI.getAllMessages(chat_id, user_id)

			return response.data
		} catch (e: any) {
			return rejectWithValue(e.response.data.message)
		}
	}
)


interface initialStateType {
	chats: Chat[]
	currentChat: {
		memberInfo: userInfo
		messages: message[]
	}
	currentChatId: number | null
	editingMessage: EditingMessage
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
	}
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
			const date = new Date(lastOnline)
			const dateInMilliSec = date.getTime()
			state.currentChat.memberInfo.lastOnline = "" + Math.round((Date.now() - dateInMilliSec) / (1000 * 60))


		},
		setEditingMessage(state, action: PayloadAction<EditingMessage>) {
			state.editingMessage = action.payload
		},
		resetEditingMessage(state) {
			state.editingMessage = {id: null, content: ""}
		},
		resetChatSlice() {
			return initialState
		}
	},
	extraReducers: (builder) => {
		// builder.addCase(fetchChatsByUserId.fulfilled, (state, action: PayloadAction<Chat[]>) => {
		// 	state.chats = action.payload
		// })
		builder.addCase(findOrCreateChat.fulfilled, (state, action: PayloadAction<ChatResponse>) => {
			state.currentChatId = action.payload.chatId
		})
		builder.addCase(getAllMessages.fulfilled, (state, action: PayloadAction<message[]>) => {
			state.currentChat.messages = action.payload
		})
	},
})
export const {
	resetChatSlice,
	setEditingMessage,
	setCurrentChatId,
	setCurrentMemberOnline,
	setCurrentMemberInfo, resetEditingMessage
} = ChatSlice.actions
export default ChatSlice.reducer
