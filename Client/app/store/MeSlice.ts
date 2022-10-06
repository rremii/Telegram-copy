import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AuthUserBio, AuthUserEmail, Me,} from "./types"
import {AuthAPI} from "../api/AuthApi"
import {SearchAPI} from "../api/SearchApi"
import {ChatAPI} from "../api/ChatApi"
import {MeAPI} from "../api/MeApi"


export const fetchMe = createAsyncThunk(
	"MeSlice/fetchMe",
	async (_, {rejectWithValue}) => {
		try {

			const response = await MeAPI.getMe()

			return response.data
		} catch (e: any) {
			return rejectWithValue(e.response.data.message)
		}
	}
)
export const changeAvatar = createAsyncThunk(
	"MeSlice/changeAvatar",
	async ({profilePic, user_id}: { profilePic: File, user_id: number }, {rejectWithValue, dispatch}) => {
		try {

			const response = await MeAPI.changeAvatar(profilePic, user_id)

			dispatch(fetchMe())

			return response.data
		} catch (e: any) {
			return rejectWithValue(e.response.data.message)
		}
	}
)


interface initialStateType {
	me: Me
}

const initialState = {
	me: {}
} as initialStateType

const MeSlice = createSlice({
	name: "MeSlice",
	initialState,
	reducers: {
		// addUserBio(state, action: PayloadAction<AuthUserBio>) {
		// 	state.userBio = action.payload
		// },
		resetMeSlice() {
			return initialState
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMe.fulfilled, (state, action: PayloadAction<Me>) => {
			state.me = action.payload
		})

	},
})
export const {resetMeSlice} = MeSlice.actions
export default MeSlice.reducer
