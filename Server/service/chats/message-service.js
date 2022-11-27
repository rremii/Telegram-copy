const { Op } = require("sequelize")
const { ChatMessage } = require("../../models/chat-models/chat-message-model")
const ApiError = require("../../exceptions/api-error")
const ChatService = require("./chat-service")
const {
    UnSeenMessage,
} = require("../../models/chat-models/unSeen-message-model")

class MessageService {
    async addMessage({ content, chat_id, user_id }) {
        if (!content || !chat_id || !user_id) {
            throw ApiError("invalid data provided")
        }

        const message = await ChatMessage.create({
            content: `${content}`,
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
                {
                    where: {
                        chat_id,
                        sender_id: user_id,
                    },
                }
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
            order: [["createdAt", "ASC"]],
        })
    }

    async deleteMessage(id, chat_id) {
        if (!id || !chat_id) throw ApiError("incorrect message or chat id")

        await ChatMessage.destroy({
            where: {
                chat_message_id: +id,
            },
        })
        return await ChatService.updateLastMessage(chat_id)
    }

    async editMessage(newContent, id, chat_id) {
        if (!newContent || !id || !chat_id) {
            throw ApiError("wrong id or content to update message")
        }

        await ChatMessage.update(
            {
                content: newContent,
            },
            {
                where: {
                    chat_message_id: id,
                },
            }
        )
        return await ChatService.updateLastMessage(chat_id)
    }
}

module.exports = new MessageService()
