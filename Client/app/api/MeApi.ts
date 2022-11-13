import {$api} from "./config"

import {Me} from "../store/types"

export const MeAPI = {
	getMe: async () => {
		return await $api.get<Me>(`me`)
	},
	changeAvatar: async (profilePic: File, user_id: number) => {

		const formData = new FormData()

		formData.append("profilePic", profilePic)
		formData.append("user_id", user_id + "")

		return await $api.post(`avatar`, formData)
	},
}
