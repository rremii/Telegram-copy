import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AuthUserBio, AuthUserEmail, Chat, searchUser} from "./types"
import {AuthAPI} from "../api/AuthApi"
import {SearchAPI} from "../api/SearchApi"
import {ChatAPI} from "../api/ChatApi"


export const createChat = createAsyncThunk(
	"ChatSlice/createChat",
	async (ids: number[], {rejectWithValue}) => {
		try {

			const response = await ChatAPI.createChat(ids)

			return response.data
		} catch (e: any) {
			return rejectWithValue(e.response.data.message)
		}
	}
)

export const fetchChatsByUserId = createAsyncThunk(
	"ChatSlice/fetchChatsByUserId",
	async (userId: number, {rejectWithValue}) => {
		try {

			const response = await ChatAPI.getChatsByUserId(userId)

			return response.data
		} catch (e: any) {
			return rejectWithValue(e.response.data.message)
		}
	}
)


interface initialStateType {
	chats: Chat[]
}

const initialState = {
	chats: []
} as initialStateType

const ChatSlice = createSlice({
	name: "ChatSlice",
	initialState,
	reducers: {
		// addUserBio(state, action: PayloadAction<AuthUserBio>) {
		// 	state.userBio = action.payload
		// },
	},
	extraReducers: (builder) => {

		builder.addCase(fetchChatsByUserId.fulfilled, (state, action: PayloadAction<Chat[]>) => {
			state.chats = action.payload
		})

	},
})
// export const {} = ChatSlice.actions
export default ChatSlice.reducer
