const fs = require("fs")
const path = require("path")
const { User } = require("../models/user-model")
const ApiError = require("../exceptions/api-error")
const TokenService = require("./token-service")
const { UserBio } = require("../models/userBio-model")
const StaticService = require("./static-service")

class MeService {
    async getMe(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError()

        const userData = TokenService.validateRefreshToken(refreshToken)
        const { user_id } = userData
        const user = await User.findOne({
            where: { user_id },
            include: {
                model: UserBio,
                as: "userBio",
            },
        })
        return {
            user_id: user.user_id,
            email: user.email,
            userBio_id: user.userBio.userBio_id,
            firstName: user.userBio.firstName,
            lastName: user.userBio.lastName,
            profilePic: user.userBio.profilePic,
            lastOnline: user.userBio.lastOnline,
        }
    }

    async changeAvatar(profilePic, user_id) {
        if (!profilePic || !user_id) throw ApiError("invalid id or profile pic")

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
        if (!user_id) throw ApiError("invalid id")

        const userBio = await UserBio.findOne({
            where: { user_id },
        })
        return await userBio.update({
            lastOnline: Date.now(),
        })
    }

    async editUserBio({ user_id, firstName, lastName }) {
        if (!user_id || !firstName || !lastName) {
            throw ApiError("invalid id, or wrong data")
        }

        return await UserBio.update(
            {
                firstName,
                lastName,
            },
            {
                where: {
                    user_id,
                },
            }
        )
    }
}

module.exports = new MeService()
