const { User } = require("../models/user-model")
const { UserBio } = require("../models/userBio-model")
const { Op } = require("sequelize")

class UserService {
    async findAll({ firstName = null, lastName = null, email = null }) {
        if (email) {
            const users = await User.findAll({
                where: { email: { [Op.like]: `%${email}%` } },
            })
            const usersInfo = await Promise.all(
                users.map(async (user) => {
                    return await UserBio.findOne({
                        where: {
                            user_id: user.dataValues.user_id,
                        },
                    })
                })
            )
            debugger
            return usersInfo
        }
        if (firstName || lastName) {
            return await UserBio.findAll({
                where: {
                    [Op.or]: [
                        { firstName: { [Op.like]: `%${firstName}%` } },
                        { lastName: { [Op.like]: `%${lastName}%` } },
                    ],
                },
            })
        } else return []
    }
}
module.exports = new UserService()
