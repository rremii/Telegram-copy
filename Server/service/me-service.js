const { Chat, UserChat } = require("../models/chat-models/chat-model")
const { User } = require("../models/user-model")
const ApiError = require("../exceptions/api-error")
const TokenService = require("./token-service")
const { UserBio } = require("../models/userBio-model")
const StaticService = require("../service/static-service")
const { unlink } = require("node:fs/promises")
const fs = require("fs")
const path = require("path")

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
    async changeAvatar(profilePic, user_id) {
        const userBioData = await UserBio.findOne({
            where: { user_id },
        })

        if (userBioData.profilePic) {
            await fs.unlink(
                path.resolve("static", userBioData.profilePic),
                () => {}
            )
        }
        const profilePicName = await StaticService.uploadFile(profilePic)

        userBioData.profilePic = profilePicName

        await userBioData.save()

        return profilePicName
    }
    async updateOnline(user_id) {
        const userBio = await UserBio.findOne({
            where: { user_id },
        })
        return await userBio.update({
            lastOnline: Date.now(),
        })
    }
}
module.exports = new MeService()
