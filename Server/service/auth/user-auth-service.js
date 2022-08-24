const { Op } = require("sequelize")
const ApiError = require("../../exceptions/api-error")
const { Candidate } = require("../../models/candidate-model")
const { User } = require("../../models/user-model")
const { UserBio } = require("../../models/userBio-model")
const UserDto = require("../../dtos/user-dto")
const TokenService = require("../token-service")
const CandidateAuthService = require("./candidate-auth-service")
const StaticService = require("../static-service")

class UserAuthService {
    async registration(code, isRememberMe, firstName, lastName, profilePic) {
        if (!code || !firstName)
            throw ApiError.BadRequest("invalid request data")

        const candidate = await Candidate.findOne({
            where: {
                code,
                expireTime: { [Op.gt]: Date.now() },
            },
        })

        if (!candidate) throw ApiError.BadRequest("code is invalid")
        const { email } = candidate.dataValues

        const registeredUser = await User.findOne({
            where: { email },
        })
        if (registeredUser) {
            throw ApiError.BadRequest("User with this email already exist")
        }

        const user = await User.create({ email })
        const { user_id } = user.dataValues

        const profilePicName = await StaticService.uploadFile(profilePic)

        await UserBio.create({
            firstName,
            lastName,
            profilePic: profilePicName,
            user_id,
        })

        await CandidateAuthService.clearExpiredCandidates(email)

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto }, isRememberMe)
        await TokenService.saveToken(userDto.user_id, tokens.refreshToken)
        return {
            ...tokens,
        }
    }

    async login(code, isRememberMe) {
        if (!code) throw ApiError.BadRequest("invalid code")

        const candidate = await Candidate.findOne({
            where: {
                code,
                expireTime: { [Op.gt]: Date.now() },
            },
        })

        if (!candidate) throw ApiError.BadRequest("code is invalid")

        const { email } = candidate.dataValues

        const user = await User.findOne({
            where: { email },
        })
        if (!user) {
            throw ApiError.BadRequest("user with this email wasn't found")
        }

        await CandidateAuthService.clearExpiredCandidates(email)

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto }, isRememberMe)
        await TokenService.saveToken(userDto.user_id, tokens.refreshToken)
        return {
            ...tokens,
        }
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        return await TokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken, isRememberMe) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findOne({
            where: { user_id: userData.user_id },
        })
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto }, isRememberMe)
        await TokenService.saveToken(userDto.user_id, tokens.refreshToken)
        return {
            ...tokens,
        }
    }
}

module.exports = new UserAuthService()
