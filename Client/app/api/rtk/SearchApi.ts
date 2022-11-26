import {Api} from "../config/Api"
import {userInfo} from "../../store/types"
import {ParseSearchString} from "../../utils/parseSearchString"

const SearchApi = Api.injectEndpoints({

		endpoints: (build) => ({

			getUsers: build.query<userInfo[], string>({
				query: (searchString: string) => {

					const {firstName, lastName, email} = ParseSearchString(searchString)

					return {
						url: `users/search?email=${email ? email : ""}${firstName ? "&firstName=" + firstName : ""}${lastName ? "&lastName=" + lastName : ""}`,
						method: "GET",
					}
				},
				// transformResponse: (response)=>respons
				//
				// 	return response.data.filter(({user_id}) => user_id !== id)
				//
				// }
				providesTags: ["Chat"],
			}),
		}),
		overrideExisting: false,
	}
)

export const {
	useGetUsersQuery
} = SearchApi
