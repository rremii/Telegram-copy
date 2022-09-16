import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AuthUserBio, AuthUserEmail, searchUser} from "./types"
import {AuthAPI} from "../api/AuthApi"
import {SearchAPI} from "../api/SearchApi"


export const fetchUsers = createAsyncThunk(
	"SearchSlice/fetchUsers",
	async (searchString: string, {rejectWithValue}) => {
		try {

			const response = await SearchAPI.getUsers(searchString)

			return response.data
		} catch (e: any) {
			return rejectWithValue(e.response.data.message)
		}
	}
)


interface initialStateType {
	users: searchUser[]
	groups: []
}

const initialState = {
	users: [],
	groups: []
} as initialStateType

const SearchSlice = createSlice({
	name: "SearchSlice",
	initialState,
	reducers: {
		// addUserBio(state, action: PayloadAction<AuthUserBio>) {
		// 	state.userBio = action.payload
		// },
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<searchUser[]>) => {

			state.users = action.payload
		})

	},
})
// export const {} = SearchSlice.actions
export default SearchSlice.reducer
