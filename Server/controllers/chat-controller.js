const ChatService = require("../service/chats/chat-service")
const MeService = require("../service/me-service")

class ChatController {
    // async createChat(request, response, next) {
    //     try {
    //         const { userIds } = request.body
    //         const userChatInfo = await ChatService.createChat(userIds)
    //
    //         response.json(userChatInfo)
    //     } catch (e) {
    //         next(e)
    //     }
    // }

    async findOrCreate(request, response, next) {
        try {
            const { userIds } = request.body

            const userChatInfo = await ChatService.findOrCreate(userIds)

            response.json(userChatInfo)
        } catch (e) {
            next(e)
        }
    }

    // async getChatById(request, response, next) {
    //     try {
    //         const { chatId } = request
    //     } catch (e) {
    //         next(e)
    //     }
    // }
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
}

module.exports = new ChatController()
