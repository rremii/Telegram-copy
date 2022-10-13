const { ChatMessage } = require("../../models/chat-models/chat-message-model")
const ApiError = require("../../exceptions/api-error")
const ChatService = require("./chat-service")
const {
    UnSeenMessage,
} = require("../../models/chat-models/unSeen-message-model")
const { Op } = require("sequelize")

class MessageService {
    async addMessage({ content, chat_id, user_id }) {
        if (!content || !chat_id || !user_id)
            throw ApiError("invalid data provided")

        const message = await ChatMessage.create({
            content: content + "",
            chat_id,
            sender_id: user_id,
        })

        await ChatService.addLastMessage(chat_id, content)

        await MessageService.#addUnSeenMessage(chat_id, user_id)

        return message
    }
    static async #addUnSeenMessage(chat_id, user_id) {
        const prevUnSeenMessage = await UnSeenMessage.findOrCreate({
            where: {
                chat_id,
                sender_id: user_id,
            },
        })

        if (prevUnSeenMessage) {
            return await UnSeenMessage.update(
                {
                    amount: prevUnSeenMessage[0].amount + 1,
                },
                { where: { chat_id, sender_id: user_id } }
            )
        }
    }

    async getMessages(chat_id, user_id) {
        if (!chat_id || !user_id) throw ApiError.BadRequest("invalid id")

        await UnSeenMessage.update(
            {
                amount: 0,
            },
            {
                where: {
                    chat_id,
                    sender_id: { [Op.ne]: user_id },
                },
            }
        )
        return await ChatMessage.findAll({
            where: { chat_id },
        })
    }
}
module.exports = new MessageService()
