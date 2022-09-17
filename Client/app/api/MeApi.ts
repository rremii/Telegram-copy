import {$api, API_URL} from "./index"

import {AuthUserBio, AuthUserEmail, Me, searchUser} from "../store/types"

export const MeAPI = {
	getMe: async () => {
		return await $api.get<Me>(`me`)
	},
}
