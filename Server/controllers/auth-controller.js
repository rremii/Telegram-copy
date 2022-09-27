const { validationResult } = require("express-validator")
const UserAuthService = require("../service/auth/user-auth-service")
const CandidateAuthService = require("../service/auth/candidate-auth-service")

class AuthController {
    async createCandidate(request, response, next) {
        try {
            const { email, type } = request.body

            await CandidateAuthService.createCandidate(email, type)

            response.json({ message: "candidate was successfully cteated" })
        } catch (e) {
            next(e)
        }
    }

    async registration(request, response, next) {
        try {
            const { code, firstName, lastName } = request.body
            const { isRememberMe } = request.cookies
            const profilePic = request?.files?.profilePic

            const tokens = await UserAuthService.registration(
                code,
                isRememberMe,
                firstName,
                lastName,
                profilePic
            )
            response.cookie("refreshToken", tokens.refreshToken, {
                maxAge: 1000 * 60 * 60 * 5,
                httpOnly: true,
                // sameSite: 'none',
                // secure: true
            })
            response.json({ accessToken: tokens.accessToken })
        } catch (e) {
            next(e)
        }
    }

    async login(request, response, next) {
        try {
            const { code } = request.body
            const { isRememberMe } = request.cookies
            const tokens = await UserAuthService.login(code, isRememberMe)
            response.cookie("refreshToken", tokens.refreshToken, {
                maxAge: 1000 * 60 * 60 * 5,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            response.json({ accessToken: tokens.accessToken })
        } catch (e) {
            next(e)
        }
    }

    async logout(request, response, next) {
        try {
            const { refreshToken } = request.cookies
            await UserAuthService.logout(refreshToken)
            response.clearCookie("refreshToken", {
                domain: process.env.API_URL,
                path: "/api/auth/logout",
                sameSite: "none",
                secure: true,
            })
            return response.status(200).json({ message: "you are logged out" })
        } catch (e) {
            next(e)
        }
    }

    async refresh(request, response, next) {
        try {
            const { refreshToken, isRememberMe } = request.cookies
            const tokens = await UserAuthService.refresh(
                refreshToken,
                isRememberMe
            )
            response.cookie("refreshToken", tokens.refreshToken, {
                maxAge: 1000 * 60 * 60 * 5,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            return response.json(tokens.accessToken)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()
