import {Api} from "../config/Api"
import {Chat, message} from "../../store/types"

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

		deleteMessage: build.mutation<message, number>({
			query: (id) => ({
				url: "/messages/" + id,
				method: "DELETE"
			}),
			invalidatesTags: ["Message"]
		}),
		editMessage: build.mutation<message, { newContent: string, id: number }>({
			query: ({newContent, id}) => {
				return {
					url: "/messages/",
					method: "PUT",
					data: {newContent, id}
					// body: {newContent, id},
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
	useDeleteChatMutation
} = ChatApi
