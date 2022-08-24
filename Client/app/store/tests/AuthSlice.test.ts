import { AuthUserBio } from "../types"
import AuthReducer, { addUser, addUserBio, clearAuthErrors } from "../AuthSlice"
import { expect } from "expect"

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

describe("AuthSlice", () => {
    it("should return initial state when action is empty", function () {
        const result = AuthReducer(undefined, { type: "" })
        expect(result).toEqual(initialState)
    })
    it("should add user bio with action 'addUserBio'", function () {
        const action = {
            type: addUserBio.type,
            payload: {
                firstName: "name",
                lastName: "last name",
            },
        }

        const result = AuthReducer(initialState, action)

        expect(result.userBio).toEqual({
            firstName: "name",
            lastName: "last name",
        })
    })
    it("should add user with action  'addUser' ", function () {
        const action = {
            type: addUser.type,
            payload: "some@email.com",
        }

        const result = AuthReducer(initialState, action)

        expect(result.user.email).toBe("some@email.com")
    })
    it("should clear all the auth errors with action 'clearAuthErrors'", function () {
        const action = { type: clearAuthErrors.type }

        const result = AuthReducer(initialState, action)

        expect(result.emailError).toBe("")
        expect(result.codeError).toBe("")
    })
})
