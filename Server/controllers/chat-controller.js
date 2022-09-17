const ChatService = require("../service/chat-service")

class ChatController {
    async createChat(request, response, next) {
        try {
            const { userIds } = request.body
            const userChatInfo = await ChatService.createChat(userIds)

            response.json(userChatInfo)
        } catch (e) {
            next(e)
        }
    }
    async getChatsByUserId(request, response, next) {
        try {
            const { userId } = request.params

            const chats = await ChatService.getChatsByUserId(userId)

            response.json(chats)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ChatController()
