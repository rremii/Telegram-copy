const { User } = require("../models/user-model")
const { UserBio } = require("../models/userBio-model")
const { Op } = require("sequelize")

class UserService {
    async findAll({ firstName, lastName }) {
        debugger
        return await UserBio.findAll({
            where: {
                [Op.or]: [
                    { firstName: { [Op.like]: `%${firstName}%` } },
                    { lastName: { [Op.like]: `%${lastName}%` } },
                ],
            },
        })
    }
}
module.exports = new UserService()
