import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {Chat, message} from "../store/types"
import {fetchChatsByUserId} from "../store/ChatSlice"

export const ChatApiRtk = createApi({

		reducerPath: "chatApiRtk",
		baseQuery: fetchBaseQuery({
				baseUrl: "http://localhost:5000/api/",
				credentials: "include",
				prepareHeaders: (headers, {getState}) => {
					headers.set("Authorization", `Bearer ${localStorage.getItem(
						"accessToken"
					)}`)
					headers.set("IsRemember", localStorage.getItem("isRememberMe") + "")

					return headers

				}
			}
		),
		tagTypes: [""],
		endpoints: (build) => ({
			getAllMessages: build.query <message[], { chat_id: number | null, user_id: number }>({
				query: ({chat_id, user_id}) => ({

					url: "messages/" + chat_id + "/" + user_id,
				})
				// providesTags: ['Post'],
			}),
			getChatsByUserId: build.query <Chat[], { user_id: number }>({
				query: ({user_id}) => ({
					url: `chatsByUserId/${user_id}`,
				})
				// providesTags: ['Post'],
			}),
			//   login: builder.mutation<any, Partial<string>>({
			//     query: (code) => ({
			//       url: '/login',
			//       body: { code },
			//       method: 'POST'
			//     }),
			//
			//     transformResponse (values: BaseQueryResult<any>) {
			//       debugger
			//     }
			//     // providesTags: ['Post'],
			//   })
			//   deletePost: builder.mutation<void, Partial<number>>({
			//       query: (id: number) => ({
			//           url: `/post/${id}`,
			//           method: 'DELETE',
			//       }),
			//       // invalidatesTags: ['Post'],
			//   }),
			//   addPost: builder.mutation<IPost, Partial<string>>({
			//       query: (newText: string) => ({
			//           url: `/post`,
			//           body: {title: newText},
			//           method: 'POST',
			//
			//       }),
			//       // invalidatesTags: ['Post'],
		}),
	}
)
export const {getAllMessages} = ChatApiRtk.endpoints
export const {
	useGetChatsByUserIdQuery,
	useGetAllMessagesQuery
} = ChatApiRtk
