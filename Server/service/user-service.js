const { Op } = require("sequelize")
const { User } = require("../models/user-model")
const { UserBio } = require("../models/userBio-model")

class UserService {
    async findAll({ firstName = null, lastName = null, email = null }) {
        // looking for users by email or first and last name
        if (email) {
            // looking for the email that contains email from search
            const users = await User.findAll({
                where: { email: { [Op.like]: `%${email}%` } },
                include: {
                    model: UserBio,
                    as: "userBio",
                },
            })
            return users.map((user) => ({
                    user_id: user.user_id,
                    email: user.email,
                    userBio_id: user.userBio.userBio_id,
                    firstName: user.userBio.firstName,
                    lastName: user.userBio.lastName,
                    profilePic: user.userBio.profilePic,
                    lastOnline: user.userBio.lastOnline,
                }))
        }
        if (firstName || lastName) {
            // looking for the user whose first or last name contain first/last name from search
            const userInfo = await UserBio.findAll({
                where: {
                    [Op.or]: [
                        { firstName: { [Op.like]: `%${firstName}%` } },
                        { lastName: { [Op.like]: `%${lastName}%` } },
                    ],
                },
                include: User,
            })
            return userInfo.map((userBio) => {
                const {user} = userBio
                return {
                    user_id: user.user_id,
                    email: user.email,
                    userBio_id: userBio.userBio_id,
                    firstName: userBio.firstName,
                    lastName: userBio.lastName,
                    profilePic: userBio.profilePic,
                    lastOnline: userBio.lastOnline,
                }
            })
        } return []
    }
}
module.exports = new UserService()
