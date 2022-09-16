const UserService = require("../service/user-service")

class UserController {
    async findAll(request, response, next) {
        try {
            const { firstName, lastName, email } = request.query
            const usersData = await UserService.findAll({
                firstName,
                lastName,
                email,
            })

            response.json(usersData)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new UserController()
