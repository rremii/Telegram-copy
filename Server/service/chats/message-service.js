const { ChatMessage } = require("../../models/chat-models/chat-message-model")
const ApiError = require("../../exceptions/api-error")
const ChatService = require("./chat-service")

class MessageService {
    async addMessage({ content, chat_id, user_id }) {
        const message = await ChatMessage.create({
            content: content + "",
            chat_id,
            sender_id: user_id,
        })

        const newChat = await ChatService.addLastMessage(chat_id)

        return message
    }

    async getMessages(chat_id) {
        if (!chat_id) throw ApiError.BadRequest("invalid id")

        return await ChatMessage.findAll({
            where: { chat_id },
        })
    }
}
module.exports = new MessageService()
