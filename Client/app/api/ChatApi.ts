import {$api, API_URL} from "./index"

import {AuthUserBio, AuthUserEmail, Chat, searchUser} from "../store/types"
import {ChatResponse} from "./types"

export const ChatAPI = {
	// createChat: async (ids: number[]) => {
	// 	return await $api.post<searchUser[]>(`chat`, {
	// 		userIds: ids
	// 	})
	// },
	findOrCreateChat: async (ids: number[]) => {
		return await $api.post<ChatResponse>(`chat`, {
			userIds: ids
		})
	},


	getChatsByUserId: async (userId: number) => {
		return await $api.get<Chat[]>(`chatsByUserId/${userId}`)
	},

}
