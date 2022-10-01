import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Chat, message, messageData, userInfo} from "./types"
import {ChatAPI} from "../api/ChatApi"
import {ChatResponse} from "../api/types"
import {AppDispatch, RootState} from "./ReduxStore"


// export const createChat = createAsyncThunk(
// 	"ChatSlice/createChat",
// 	async (ids: number[], {rejectWithValue}) => {
// 		try {
//
// 			const response = await ChatAPI.createChat(ids)
//
// 			return response.data
// 		} catch (e: any) {
// 			return rejectWithValue(e.response.data.message)
// 		}
// 	}
// )
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

export const fetchChatsByUserId = createAsyncThunk<Chat[],
	number,
	{
		dispatch: AppDispatch
		state: RootState
	}>(
	"ChatSlice/fetchChatsByUserId",
	async (userId: number, {rejectWithValue, dispatch, getState}) => {
		try {

			const response = await ChatAPI.getChatsByUserId(userId)


			//TODO gotta make it pretty
			const state = getState()
			const {currentChatId} = state.Chats
			if (currentChatId) {
				const currentChat = response.data.find(({chat_id}) => chat_id === currentChatId)
				if (currentChat?.memberInfo.lastOnline) dispatch(setCurrentMemberOnline(currentChat.memberInfo.lastOnline))
			}
			return response.data
		} catch (e: any) {
			return rejectWithValue(e.response.data.message)
		}
	}
)
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
	async (chat_id: number, {rejectWithValue}) => {
		try {
			const response = await ChatAPI.getAllMessages(chat_id)

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
	currentChatId: null
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
		setCurrentMemberOnline(state, action: PayloadAction<Date>) {
			state.currentChat.memberInfo.lastOnline = action.payload
		},

	},
	extraReducers: (builder) => {
		builder.addCase(fetchChatsByUserId.fulfilled, (state, action: PayloadAction<Chat[]>) => {
			state.chats = action.payload
		})
		builder.addCase(findOrCreateChat.fulfilled, (state, action: PayloadAction<ChatResponse>) => {
			state.currentChatId = action.payload.chatId
		})
		builder.addCase(getAllMessages.fulfilled, (state, action: PayloadAction<message[]>) => {
			state.currentChat.messages = action.payload
		})
	},
})
export const {setCurrentChatId, setCurrentMemberOnline, setCurrentMemberInfo} = ChatSlice.actions
export default ChatSlice.reducer
