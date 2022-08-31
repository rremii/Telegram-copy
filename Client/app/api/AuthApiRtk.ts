import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const AuthApiRtk = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api/"}),
	tagTypes: [""],
	endpoints: () => ({
		// endpoints: (builder) => ({
		//   createCandidate: builder.mutation<{ message: string }, Partial<{ email: string, type: string }>>({
		//     query: ({ email, type }) => ({
		//       url: '/candidate',
		//       body: { email, type },
		//       method: 'POST'
		//     })
		//     // providesTags: ['Post'],
		//   }),
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
		//   }),
	}),
})
// export const { createCandidate } = AuthApiRtk.endpoints
// export const {
// useCreateCandidateMutation,
// useLoginMutation
// } = AuthApiRtk
