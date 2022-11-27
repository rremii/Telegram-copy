const ChatService = require("../service/chats/chat-service")
const MeService = require("../service/me-service")

class ChatController {
    async findOrCreate(request, response, next) {
        try {
            const { userIds } = request.body

            const userChatInfo = await ChatService.findOrCreate(userIds)

            response.json(userChatInfo)
        } catch (e) {
            next(e)
        }
    }

    async getChatsByUserId(request, response, next) {
        try {
            const { userId } = request.params

            await MeService.updateOnline(userId)

            const chats = await ChatService.getChatsByUserId(userId)

            response.json(chats)
        } catch (e) {
            next(e)
        }
    }

    async deleteChat(request, response, next) {
        try {
            const userIds = request.body

            await ChatService.deleteChat(userIds)

            response.json({ message: "chat was successfully deleted" })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ChatController()
