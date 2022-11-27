import {Api} from "../config/Api"
import {AuthUserBio, AuthUserEmail} from "../../store/types"
import {DefaultResponse, TokenResponse} from "../types"

const AuthApi = Api.injectEndpoints({

		endpoints: (build) => ({

			createCandidate: build.mutation<DefaultResponse, AuthUserEmail>({
				query: ({email, type}) => ({
					url: "auth/candidate",
					method: "POST",
					data: {
						type,
						email,
					}
				})
				// providesTags: ["Chat"],
			}),

			login: build.mutation<TokenResponse, string>({
				query: (code) => ({
					url: "auth/login",
					method: "POST",
					data: {
						code
					}
				}),
				transformResponse: (response: TokenResponse) => {
					localStorage.setItem("accessToken", response.accessToken)
					return response
				},
				invalidatesTags: ["Me"]

				// providesTags: ["Chat"],
			}),

			registration: build.mutation<TokenResponse, { code: string } & AuthUserBio>({
				query: ({
					code,
					firstName,
					lastName,
					profilePic,
				}) => {
					const formData = new FormData()
					formData.append("code", code)
					formData.append("firstName", firstName)
					if (lastName) formData.append("lastName", lastName)
					if (profilePic) formData.append("profilePic", profilePic)

					return {
						url: "auth/registration",
						method: "POST",
						data: formData
					}
				},
				transformResponse: (response: TokenResponse) => {
					localStorage.setItem("accessToken", response.accessToken)
					return response
				},
				invalidatesTags: ["Me"]

				// providesTags: ["Chat"],
			}),


		}),
		overrideExisting: false,
	}
)

// export const {
// 	useCreateCandidateMutation,
// 	useLoginMutation,
// 	useRegistrationMutation
// } = AuthApi
