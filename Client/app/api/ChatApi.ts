import {$api} from "./index"
import {Chat, message, messageData} from "../store/types"
import {ChatResponse} from "./types"

export const ChatAPI = {

	findOrCreateChat: async (ids: number[]) => {
		return await $api.post<ChatResponse>(`chat`, {
			userIds: ids
		})
	},

	getChatsByUserId: async (userId: number) => {
		return await $api.get<Chat[]>(`chatsByUserId/${userId}`)
	},

	addMessage: async (messageData: messageData) => {
		return await $api.post<message>("messages", messageData)
	},

	getAllMessages: async (chat_id: number, user_id: number) => {
		return await $api.get<message[]>("messages/" + chat_id + "/" + user_id)
	}
}
