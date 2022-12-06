const { Op } = require("sequelize")
const ApiError = require("../../exceptions/api-error")
const { User } = require("../../models/user-model")
const MailService = require("../mail-service")
const { Candidate, fiveMin } = require("../../models/candidate-model")
const uuid = require("uuid")

class CandidateAuthService {
    async createCandidate(email, type = "register") {
        if (!email) throw ApiError.BadRequest("invalid email")

        const registeredUser = await User.findOne({
            where: { email },
        })
        if (type === "register" && registeredUser) {
            throw ApiError.BadRequest("User with this email already exist")
        }
        if (type === "login" && !registeredUser) {
            throw ApiError.BadRequest("User with this email was not found")
        }

        const code = uuid.v4().slice(0, 6)
        // const code = "111111"

        await MailService.sendCodeMail(email, code)

        await Candidate.create({
            email,
            code,
            expireTime: Date.now() + fiveMin,
        })
    }

    async clearExpiredCandidates(email) {
        await Candidate.destroy({
            where: {
                [Op.or]: [{ expireTime: { [Op.gt]: Date.now() } }, { email }],
            },
        })
    }
}

module.exports = new CandidateAuthService()
