import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthUserBio, AuthUserEmail } from "./types"
import { AuthAPI } from "../api/AuthApi"

export const fetchCreateCandidate = createAsyncThunk(
    "AuthSlice/fetchPosts",
    async ({ email, type }: AuthUserEmail, { rejectWithValue }) => {
        try {
            const response = await AuthAPI.createCandidate({ email, type })

            return response.data
        } catch (e: any) {
            //TODO check if it works and integrate
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const fetchLogin = createAsyncThunk(
    "AuthSlice/fetchLogin",
    async (code: string, { rejectWithValue }) => {
        try {
            const response = await AuthAPI.login(code)
            if (!response.data.accessToken) throw new Error("server error")
            localStorage.setItem("accessToken", response.data.accessToken)
        } catch (e: any) {
            return rejectWithValue(e.response.data.message)
        }
    }
)
export const fetchRegistration = createAsyncThunk(
    "AuthSlice/fetchRegistration",
    async (
        {
            code,
            firstName,
            lastName,
            profilePic,
        }: { code: string } & AuthUserBio,
        { rejectWithValue }
    ) => {
        try {
            const response = await AuthAPI.registration({
                code,
                firstName,
                lastName,
                profilePic,
            })
            if (!response.data.accessToken) throw new Error("server error")
            localStorage.setItem("accessToken", response.data.accessToken)
        } catch (e: any) {
            return rejectWithValue(e.response.data.message)
        }
    }
)
export const fetchCheckIsAuth = createAsyncThunk(
    "AuthSlice/fetchCheckIsAuth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthAPI.refresh()
            localStorage.setItem("accessToken", response.data.accessToken)
            // return response.data.user
        } catch (e: any) {
            return rejectWithValue(e.response.data.message)
        }
    }
)
export const fetchLogout = createAsyncThunk(
    "AuthSlice/fetchLogout",
    async (_, { dispatch }) => {
        try {
            const response = await AuthAPI.logout()
            localStorage.removeItem("accessToken")
            dispatch(fetchCheckIsAuth())
            return response.data
        } catch (e: any) {
            throw e.response.data.message
        }
    }
)

interface initialStateType {
    isLoggedIn: "first loading" | "success" | "rejected"
    userBio: AuthUserBio
    isPending: boolean
    user: {
        email: string
    }
    emailError: string
    codeError: string
}

const initialState = {
    isLoggedIn: "first loading",
    userBio: {},
    user: {
        email: "",
    },
    isPending: true,
    emailError: "",
    codeError: "",
} as initialStateType

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        addUserBio(state, action: PayloadAction<AuthUserBio>) {
            state.userBio = action.payload
        },
        addUser(state, action: PayloadAction<string>) {
            state.user.email = action.payload
        },
        clearAuthErrors(state) {
            state.emailError = ""
            state.codeError = ""
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCreateCandidate.fulfilled, (state) => {
            state.emailError = ""
        })
        builder.addCase(fetchCreateCandidate.rejected, (state, action) => {
            state.emailError = action.payload + ""
        })

        builder.addCase(fetchLogin.fulfilled, (state) => {
            state.isPending = false
            state.isLoggedIn = "success"
            state.codeError = ""
        })
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.isPending = false
            state.isLoggedIn = "rejected"
            state.codeError = action.payload + ""
        })

        builder.addCase(fetchRegistration.fulfilled, (state) => {
            state.isPending = false
            state.isLoggedIn = "success"
            state.codeError = ""
        })
        builder.addCase(fetchRegistration.rejected, (state, action) => {
            state.isPending = false
            state.isLoggedIn = "rejected"
            state.codeError = action.payload + ""
        })

        builder.addCase(fetchCheckIsAuth.fulfilled, (state) => {
            state.isLoggedIn = "success"
            state.isPending = false
        })
        builder.addCase(fetchCheckIsAuth.pending, (state) => {
            state.isPending = true
        })
        builder.addCase(fetchCheckIsAuth.rejected, (state) => {
            state.isLoggedIn = "rejected"
            state.isPending = false
            localStorage.removeItem("accessToken")
        })

        builder.addCase(fetchLogout.fulfilled, (state) => {
            state.isPending = true
            state.isLoggedIn = "first loading"
            // state.registrationError = ''
            // state.loginError = ''
        })
        builder.addCase(fetchLogout.rejected, (state) => {
            localStorage.removeItem("accessToken")
            state.isPending = true
            state.isLoggedIn = "first loading"
            // state.registrationError = ''
            // state.loginError = ''
        })
    },
})
export const { addUser, addUserBio, clearAuthErrors } = AuthSlice.actions
export default AuthSlice.reducer
