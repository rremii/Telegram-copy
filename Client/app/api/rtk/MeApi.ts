import {Api} from "../config/Api"
import {Me, message} from "../../store/types"

const MeApi = Api.injectEndpoints({

	endpoints: (build) => ({

		getMe: build.query <Me, void>({
			query: () => ({
				url: "me",
				method: "GET"
			}),
			providesTags: ["Me"],
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
	}),
	overrideExisting: false,
})

export const {
	useGetMeQuery,
	useEditUserBioMutation
} = MeApi
