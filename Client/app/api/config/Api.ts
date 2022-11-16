import {BaseQueryFn, createApi} from "@reduxjs/toolkit/query/react"
import {Chat, Me, message} from "../../store/types"
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

			const result = await $api({url: baseUrl + url, method, data, params})
			return {data: result.data}

		}


export const Api = createApi({
		reducerPath: "chatApiRtk",
		baseQuery: axiosBaseQuery({
			baseUrl: "http://localhost:5000/api/",
		}),

		tagTypes: ["Message", "Me", "Chat"],
		endpoints: (build) => ({}),
	}
)
// export const {getAllMessages} = Api.endpoints
// export const {
//
// } = Api
