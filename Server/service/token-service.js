const jwt = require("jsonwebtoken")
const { Token } = require("../models/token-model")

class TokenService {
    static #generateTokens(payload, isRememberMe = false) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET_KEY,
            { expiresIn: "20s" }
        )
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET_KEY,
            { expiresIn: isRememberMe === "true" ? "1d" : "30s" }
        )
        return {
            accessToken,
            refreshToken,
        }
    }

    static async #saveToken(user_id, refreshToken) {
        const tokenData = await Token.findOne({
            where: { user_id },
        })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return await tokenData.save()
        }
        const tokenResponse = await Token.create({
            user_id,
            refreshToken,
        })
        if (!tokenResponse.dataValues) throw new Error("token was not saved")
    }

    async getAndSaveTokens(UserPayload, isRememberMe) {
        const tokens = TokenService.#generateTokens(
            { ...UserPayload },
            isRememberMe
        )
        await TokenService.#saveToken(UserPayload.user_id, tokens.refreshToken)
        return tokens
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
        } catch (e) {
            return null
        }
    }

    async removeToken(refreshToken) {
        return await Token.destroy({
            where: { refreshToken },
        })
    }

    async findToken(refreshToken) {
        return await Token.findOne({
            where: { refreshToken },
        })
    }
}

module.exports = new TokenService()
