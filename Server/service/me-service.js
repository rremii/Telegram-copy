const { Chat, UserChat } = require("../models/chat-models/chat-model")
const { User } = require("../models/user-model")
const ApiError = require("../exceptions/api-error")
const TokenService = require("./token-service")
const { UserBio } = require("../models/userBio-model")

class MeService {
    async getMe(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError()

        const userData = TokenService.validateRefreshToken(refreshToken)
        const { user_id } = userData
        const user = await User.findOne({
            where: { user_id },
        })

        const userBio = await UserBio.findOne({
            where: { user_id },
        })
        return {
            ...user.dataValues,
            ...userBio.dataValues,
        }
    }
}
module.exports = new MeService()
