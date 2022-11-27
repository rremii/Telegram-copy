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
            const { chat_id, user_id } = request.params

            const messages = await MessageService.getMessages(chat_id, user_id)

            response.json(messages)
        } catch (e) {
            next(e)
        }
    }

    async deleteMessage(request, response, next) {
        try {
            const { id, chat_id } = request.params

            const deletedMessage = await MessageService.deleteMessage(
                id,
                chat_id
            )

            response.json(deletedMessage)
        } catch (e) {
            next(e)
        }
    }

    async editMessage(request, response, next) {
        try {
            const { newContent, id, chat_id } = request.body

            const updatedMessage = await MessageService.editMessage(
                newContent,
                id,
                chat_id
            )

            response.json(updatedMessage)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new MessageController()
