const UserService = require("../service/user-service")

class UserController {
    async findAll(request, response, next) {
        try {
            const searchingQueries = request.query

            const usersData = await UserService.findAll(searchingQueries)

            response.json(usersData)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new UserController()
