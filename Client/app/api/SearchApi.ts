import {$api, API_URL} from "./index"
import axios from "axios"
import {DefaultResponse, TokenResponse} from "./types"
import {AuthUserBio, AuthUserEmail, searchUser} from "../store/types"

export const SearchAPI = {
	getUsers: async (searchString: string) => {

		const splittedString = searchString.split(" ")
		const firstName = splittedString[0]
		const lastName = splittedString[1]
		return await $api.get<searchUser[]>(`users?firstName=${firstName || null}&lastName=${lastName || null}`)
	},

}
