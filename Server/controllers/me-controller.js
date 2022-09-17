const MeService = require("../service/me-service")

class MeController {
    async getMe(request, response, next) {
        try {
            const { refreshToken } = request.cookies

            const userData = await MeService.getMe(refreshToken)
            response.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new MeController()
