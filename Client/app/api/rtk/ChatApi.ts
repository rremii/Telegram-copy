import {Api} from "../config/Api"
import {Chat, message, messageData} from "../../store/types"
import {ChatResponse} from "../types"

const ChatApi = Api.injectEndpoints({
	endpoints: (build) => ({
		getAllMessages: build.query <message[], { chat_id: number | null, user_id: number }>({
			query: ({chat_id, user_id}) => ({
				url: "messages/" + chat_id + "/" + user_id,
				method: "GET"
			}),
			providesTags: ["Message"],
		}),
		getChatsByUserId: build.query <Chat[], { user_id: number }>({
			query: ({user_id}) => ({
				url: `chatsByUserId/${user_id}`,
				method: "GET"
			}),
			providesTags: ["Chat"],
		}),

		findOrCreateChat: build.mutation<ChatResponse, number[]>({
			query: (ids) => ({
				url: "chat/",
				method: "POST",
				data: {
					userIds: ids
				},
			}),
			invalidatesTags: ["Chat"]
		}),
		addMessage: build.mutation<message, messageData>({
			query: (messageData) => ({
				url: "messages",
				method: "POST",
				data: messageData
			}),
			invalidatesTags: ["Message"]
		}),
		deleteMessage: build.mutation<message, { id: number, chat_id: number }>({
			query: ({id, chat_id}) => ({
				url: "/messages/" + id + "/" + chat_id,
				method: "DELETE"
			}),
			invalidatesTags: ["Message"]
		}),
		editMessage: build.mutation<message, { newContent: string, id: number, chat_id: number }>({
			query: ({newContent, id, chat_id}) => {
				return {
					url: "/messages/",
					method: "PUT",
					data: {newContent, id, chat_id}
				}
			},
			invalidatesTags: ["Message"]
		}),
		deleteChat: build.mutation<{ message: string }, number[]>({
			query: (userIds) => {
				return {
					url: "/chat",
					method: "DELETE",
					data: userIds
				}
			},
			invalidatesTags: ["Chat"]
		}),

	}),
	overrideExisting: false,
})

export const {
	useGetChatsByUserIdQuery,
	useGetAllMessagesQuery,
	useDeleteMessageMutation,
	useEditMessageMutation,
	useDeleteChatMutation,
	useFindOrCreateChatMutation,
	useAddMessageMutation
} = ChatApi
