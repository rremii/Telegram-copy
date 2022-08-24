import { $api, API_URL } from "./index"
import axios from "axios"
import { DefaultResponse, TokenResponse } from "./types"
import { AuthUserBio, AuthUserEmail } from "../store/types"

export const AuthAPI = {
    createCandidate: async ({ email, type }: AuthUserEmail) => {
        return await $api.post<DefaultResponse>("auth/candidate", {
            type,
            email,
        })
    },
    login: async (code: string) => {
        return await $api.post<TokenResponse>("auth/login", {
            code,
        })
    },
    registration: async ({
        code,
        firstName,
        lastName,
        profilePic,
    }: { code: string } & AuthUserBio) => {
        const formData = new FormData()
        formData.append("code", code)
        formData.append("firstName", firstName)
        if (lastName) formData.append("lastName", lastName)
        if (profilePic) formData.append("profilePic", profilePic)
        return await $api.post<TokenResponse>("auth/registration", formData)
    },
    refresh: async () => {
        return await axios.get<TokenResponse>(API_URL + "auth/refresh", {
            withCredentials: true,
            // headers: {
            //     IsRemember: localStorage.getItem('isRememberMe') + ''
            // }
        })
    },
    logout: async () => {
        return await $api.post("auth/logout")
    },

    // getPosts: () => {
    //     return instance.get(`posts`)
    // },
    // addPost: (newTitle: string) => {
    //     return instance.post(`posts`, {title: newTitle})
    // },
    // deletePost: (id: number) => {
    //     return instance.delete(`posts/${id}`)
    // },
}
