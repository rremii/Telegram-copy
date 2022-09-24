const { User } = require("../models/user-model")
const { UserBio } = require("../models/userBio-model")
const { Op } = require("sequelize")

class UserService {
    async findAll({ firstName = null, lastName = null, email = null }) {
        //TODO add comments to this algo
        if (email) {
            const users = await User.findAll({
                where: { email: { [Op.like]: `%${email}%` } },
            })
            const userBio = await Promise.all(
                users.map(async (user) => {
                    return await UserBio.findOne({
                        where: {
                            user_id: user.dataValues.user_id,
                        },
                    })
                })
            )
            return users.map((user, i) => ({
                ...user.dataValues,
                ...userBio[i].dataValues,
            }))
        }
        if (firstName || lastName) {
            const userInfo = await UserBio.findAll({
                where: {
                    [Op.or]: [
                        { firstName: { [Op.like]: `%${firstName}%` } },
                        { lastName: { [Op.like]: `%${lastName}%` } },
                    ],
                },
                include: User,
            })

            return userInfo.map((userInfo) => {
                const { user, ...userData } = userInfo.dataValues
                return {
                    ...user.dataValues,
                    ...userData,
                }
            })
        } else return []
    }
}
module.exports = new UserService()
