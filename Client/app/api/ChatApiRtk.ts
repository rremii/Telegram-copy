import {BaseQueryFn, createApi} from "@reduxjs/toolkit/query/react"
import {Chat, Me, message} from "../store/types"
import {AxiosRequestConfig} from "axios"
import {$api} from "./index"


const axiosBaseQuery =
	(
		{baseUrl}: { baseUrl: string } = {baseUrl: ""}
	): BaseQueryFn<{
		url: string
		method: AxiosRequestConfig["method"]
		data?: AxiosRequestConfig["data"]
		params?: AxiosRequestConfig["params"]
	},
		unknown,
		unknown> =>
		async ({url, method, data, params}) => {
			// try {
			const result = await $api({url: baseUrl + url, method, data, params})
			return {data: result.data}
			// } catch (axiosError) {
			// 	const err = axiosError as AxiosError
			// 	return {
			// 		error: {
			// 			status: err.response?.status,
			// 			data: err.response?.data || err.message,
			// 		},
			// 	}
			// }
		}


export const ChatApiRtk = createApi({
		reducerPath: "chatApiRtk",
		baseQuery: axiosBaseQuery({
			baseUrl: "http://localhost:5000/api/",
		}),
		// baseQuery: fetchBaseQuery({
		// 		baseUrl: "http://localhost:5000/api/",
		// 		credentials: "include",
		// 		prepareHeaders: (headers, {getState}) => {
		// 			headers.set("Authorization", `Bearer ${localStorage.getItem(
		// 				"accessToken"
		// 			)}`)
		// 			headers.set("IsRemember", localStorage.getItem("isRememberMe") + "")
		//
		// 			return headers
		//TODO add interceptor on refetch and logout if it fails
		// }
		// }
		// ),
		tagTypes: ["Message", "Me"],
		endpoints: (build) => ({
			getAllMessages: build.query <message[], { chat_id: number | null, user_id: number }>({
				query: ({chat_id, user_id}) => ({
					url: "messages/" + chat_id + "/" + user_id,
					method: "GET"
				})
				// providesTags: ['Post'],
			}),
			getChatsByUserId: build.query <Chat[], { user_id: number }>({
				query: ({user_id}) => ({
					url: `chatsByUserId/${user_id}`,
					method: "GET"
				}),
				providesTags: ["Message"],
			}),
			getMe: build.query <Me, void>({
				query: () => ({
					url: "me",
					method: "GET"
				}),
				providesTags: ["Me"],
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
			editUserBio: build.mutation<message, {
				profilePic: File | null,
				user_id: number,
				firstName: string,
				lastName: string
			}>({
				query: ({user_id, firstName, lastName, profilePic}) => {
					const formData = new FormData()
					if (profilePic)
						formData.append("profilePic", profilePic)
					formData.append("user_id", user_id + "")
					formData.append("firstName", firstName + "")
					formData.append("lastName", lastName + "")
					return {
						url: "/edit",
						method: "PUT",
						data: formData
						// body: {newContent, id},
					}
				},
				invalidatesTags: ["Me"]
			}),

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
	useGetAllMessagesQuery,
	useGetMeQuery,
	useDeleteMessageMutation,
	useEditMessageMutation,
	useEditUserBioMutation
} = ChatApiRtk
