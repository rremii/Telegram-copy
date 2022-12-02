import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {userInfo} from "./types"


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
		setSearchedUsers(state, action: PayloadAction<{ user_id: number, users: userInfo[] }>) {
			const {users, user_id: id} = action.payload
			state.users = users.filter(({user_id}) => user_id !== id)
		},
		resetSearchSlice() {
			return initialState
		},

	},

})
export const {resetSearchSlice, setSearchedUsers} = SearchSlice.actions
export default SearchSlice.reducer
