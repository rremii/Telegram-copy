const { Chat, UserChat } = require("../../models/chat-models/chat-model")
const { User } = require("../../models/user-model")
const ApiError = require("../../exceptions/api-error")
const { UserBio } = require("../../models/userBio-model")
const { Op } = require("sequelize")
const {
    UnSeenMessage,
} = require("../../models/chat-models/unSeen-message-model")
const { LastMessage } = require("../../models/chat-models/last-message-model")
const { ChatMessage } = require("../../models/chat-models/chat-message-model")

class ChatService {
    static async #createChat(userIds) {
        if (!userIds) throw ApiError.BadRequest("invalid id's")
        const [id1, id2] = userIds

        if (id1 === id2) throw ApiError.BadRequest("wrong ids")

        const chat = await Chat.create()

        await UserChat.bulkCreate([
            {
                chat_id: chat.chat_id,
                user_id: id1,
            },
            {
                chat_id: chat.chat_id,
                user_id: id2,
            },
        ])

        return {
            chatId: chat.chat_id,
            membersIds: userIds,
        }
    }

    static async #findChatByIds(userIds) {
        const [id1, id2] = userIds

        const chats1 = await UserChat.findAll({
            where: { user_id: id1 },
        })

        const chats2 = await UserChat.findAll({
            where: { user_id: id2 },
        })
        if (!chats1.length || !chats2.length) return null

        //looking for same chats that both users have
        return chats1.find((chat1) => {
            return chats2.some((chat2) => chat2.chat_id === chat1.chat_id)
        })
    }

    async findOrCreate(userIds) {
        if (!userIds) throw ApiError.BadRequest("invalid id's")

        const chat = await ChatService.#findChatByIds(userIds)

        if (chat) {
            const chatId = chat?.chat_id
            return {
                chatId,
                memberIds: userIds,
            }
        }
        if (!chat) return await ChatService.#createChat(userIds)
    }

    async getChatsByUserId(user_id) {
        //looking for all the chat that user has
        const userChats = await User.findOne({
            where: { user_id },
            include: {
                model: Chat,
                include: LastMessage,
            },
        })

        //converting chats for a better looking
        const chats = userChats.chats.map((chat) => {
            return {
                chat_id: chat.chat_id,
                lastMessage: {
                    content: chat.lastMessage ? chat.lastMessage.content : null,
                    updatedAt: chat.lastMessage
                        ? chat.lastMessage.updatedAt
                        : null,
                },
                unSeenMessages: chat.unSeenMessages ? chat.unSeenMessages : 0,
            }
        })
        return await Promise.all(
            chats.map(async (chat) => {
                const chat_id = chat.chat_id

                //find the chat user's unseen messages
                const unSeenMessage = await UnSeenMessage.findOne({
                    where: {
                        chat_id,
                        sender_id: { [Op.ne]: user_id },
                    },
                })
                //find the chat user's partner
                const currentChat = await Chat.findOne({
                    where: { chat_id },
                    include: {
                        model: User,
                        where: { user_id: { [Op.ne]: user_id } },
                        include: {
                            as: "userBio",
                            model: UserBio,
                        },
                    },
                })
                const member = currentChat.users[0]

                return {
                    memberInfo: {
                        email: member.email,
                        ...member.userBio.dataValues,
                    },
                    unSeenMessages: unSeenMessage ? unSeenMessage.amount : 0,
                    chat_id: chat.chat_id,
                    lastMessage: chat.lastMessage,
                }
            })
        )
    }

    async addLastMessage(chat_id, content) {
        const [lastMessage] = await LastMessage.findOrCreate({
            where: { chat_id },
        })
        lastMessage.content = content

        return await lastMessage.save()
    }
    async deleteLastMessage(chat_id) {
        const [lastMessage] = await ChatMessage.findAll({
            limit: 1,
            where: { chat_id: +chat_id },
            order: [["createdAt", "DESC"]],
        })

        return await this.addLastMessage(chat_id, lastMessage.content)
    }
    async deleteChat(userIds) {
        if (!userIds) return ApiError("wrong user ids")
        const chat = await ChatService.#findChatByIds(userIds)

        return await Chat.destroy({
            where: {
                chat_id: chat.chat_id,
            },
        })
    }
}

module.exports = new ChatService()
