import {userInfo} from "../types"
import SearchReducer, {resetSearchSlice, setSearchedUsers} from "../SearchSlice"

interface initialStateType {
	users: userInfo[]
	groups: []
}

const initialState = {
	users: [],
	groups: []
} as initialStateType


const mockedPayloadData = {
	user_id: 1,
	users: [{
		user_id: 1,
		userBio_id: 1,
		email: "email@email.com",
		firstName: "Artem",
		lastName: null,
		profilePic: null,
		lastOnline: null
	}, {
		user_id: 2,
		userBio_id: 2,
		email: "email@email.com",
		firstName: "Remi",
		lastName: null,
		profilePic: null,
		lastOnline: null
	}]
}

describe("ChatSlice", () => {
	it("should return initial state when action is empty", function () {
		const result = SearchReducer(undefined, {type: ""})
		expect(result).toEqual(initialState)
	})
	it("should set SearchedUsers with action 'setSearchedUsers'", function () {

		const action = {
			type: setSearchedUsers.type,
			payload: mockedPayloadData
		}

		const result = SearchReducer(initialState, action)

		expect(result.users).toEqual(mockedPayloadData.users.splice(1))
		expect(result.users).not.toEqual(mockedPayloadData.users)
		expect(result.users).toHaveLength(1)
	})
	it("should reset SearchSlice with action 'resetSearchSlice'", function () {
		const state = {
			groups: [],
			users: mockedPayloadData.users
		} as initialStateType

		const action = {
			type: resetSearchSlice.type,
		}

		const result = SearchReducer(state, action)

		expect(result).toEqual(initialState)
	})


})
