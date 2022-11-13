import {$api} from "./config"
import {userInfo} from "../store/types"
import {ParseSearchString} from "../utils/parseSearchString"

export const SearchAPI = {
	getUsers: async (searchString: string) => {

		const {firstName, lastName, email} = ParseSearchString(searchString)

		return await $api.get<userInfo[]>(`users/search?email=${email ? email : ""}${firstName ? "&firstName=" + firstName : ""}${lastName ? "&lastName=" + lastName : ""}`)
	},

}
