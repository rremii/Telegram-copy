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
    async changeAvatar(request, response, next) {
        try {
            const profilePic = request?.files?.profilePic
            const { user_id } = request.body

            const newProfilePic = await MeService.changeAvatar(
                profilePic,
                +user_id
            )

            return response.json(newProfilePic)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new MeController()
