import {$api, API_URL} from "./index"

import {AuthUserBio, AuthUserEmail, searchUser} from "../store/types"

export const SearchAPI = {
	getUsers: async (searchString: string) => {


		let email
		let firstName
		let lastName

		if (searchString.includes("@")) {
			email = searchString
		} else {
			const splittedString = searchString.split(" ")
			firstName = splittedString[0]
			lastName = splittedString[1]
		}


		return await $api.get<searchUser[]>(`users/search?email=${email ? email : ""}${firstName ? "&firstName=" + firstName : ""}${lastName ? "&lastName=" + lastName : ""}`)
	},

}
