import {Me} from "../types"
import MeReducer, {resetMeSlice, setMe} from "../MeSlice"

interface initialStateType {
	me: Me
}

const initialState = {
	me: {}
} as initialStateType

describe("ChatSlice", () => {
	it("should return initial state when action is empty", function () {
		const result = MeReducer(undefined, {type: ""})
		expect(result).toEqual(initialState)
	})
	it("should set me with action 'setMe'", function () {
		const payload = {
			user_id: 1,
			userBio_id: 1,
			email: "email@email.com",
			firstName: "Artem",
			lastName: null,
			profilePic: null,
		}

		const action = {
			type: setMe.type,
			payload
		}

		const result = MeReducer(initialState, action)

		expect(result.me).toEqual(payload)
	})
	it("should reset MeSlice with action 'resetMeSlice'", function () {
		const state = {
			me: {
				user_id: 1,
				userBio_id: 1,
				email: "email@email.com",
				firstName: "Artem",
				lastName: null,
				profilePic: null,
			}
		}

		const action = {
			type: resetMeSlice.type,
		}

		const result = MeReducer(state, action)

		expect(result).toEqual(initialState)
	})

})
