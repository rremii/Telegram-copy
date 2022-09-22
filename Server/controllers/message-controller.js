const MessageService = require("../service/chats/message-service")

class MessageController {
    async addMessage(request, response, next) {
        try {
            const { user_id, content, chat_id } = request.body

            const message = await MessageService.addMessage({
                user_id,
                content,
                chat_id,
            })

            response.json(message)
        } catch (e) {
            next(e)
        }
    }

    async getMessages(request, response, next) {
        try {
            const { chat_id } = request.params

            const messages = await MessageService.getMessages(chat_id)

            response.json(messages)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new MessageController()
