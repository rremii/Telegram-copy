import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {userInfo} from "./types"
import {SearchAPI} from "../api/SearchApi"
import {AppDispatch, RootState} from "./ReduxStore"


export const fetchUsers = createAsyncThunk<userInfo[],
	string,
	{
		dispatch: AppDispatch
		state: RootState
	}>(
	"SearchSlice/fetchUsers",
	async (searchString: string, {rejectWithValue, getState}) => {
		try {

			const response = await SearchAPI.getUsers(searchString)

			const state = getState()

			const id = state.Me.me.user_id


			return response.data.filter(({user_id}) => user_id !== id)
		} catch (e: any) {
			return rejectWithValue(e.response.data.message)
		}
	}
)


interface initialStateType {
	users: userInfo[]
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
		resetSearchSlice() {
			return initialState
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<userInfo[]>) => {

			state.users = action.payload
		})

	},
})
export const {resetSearchSlice} = SearchSlice.actions
export default SearchSlice.reducer
