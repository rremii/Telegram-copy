const { Chat, UserChat } = require("../../models/chat-models/chat-model")
const { User } = require("../../models/user-model")
const ApiError = require("../../exceptions/api-error")
const { UserBio } = require("../../models/userBio-model")
const { Op } = require("sequelize")
const {
    UnSeenMessage,
} = require("../../models/chat-models/unSeen-message-model")
const { LastMessage } = require("../../models/chat-models/last-message-model")

class ChatService {
    async createChat(userIds) {
        if (!userIds) throw ApiError.BadRequest("invalid id's")
        const [id1, id2] = userIds

        if (id1 === id2) throw ApiError.BadRequest("wrong ids")

        const { dataValues: chatData } = await Chat.create()

        await UserChat.bulkCreate([
            { chat_id: chatData.chat_id, user_id: id1 },
            { chat_id: chatData.chat_id, user_id: id2 },
        ])

        return { chatId: chatData.chat_id, membersIds: userIds }
    }

    async findOrCreate(userIds) {
        if (!userIds) throw ApiError.BadRequest("invalid id's")
        const [id1, id2] = userIds
        ////////////////////////////////////////////////////////
        const chats1 = await UserChat.findAll({
            where: { user_id: id1 },
        })
        const chatsIds1 = chats1.map((chat) => {
            return chat.dataValues.chat_id
        })
        const chats2 = await UserChat.findAll({
            where: { user_id: id2 },
        })
        const chatsIds2 = chats2.map((chat) => {
            return chat.dataValues.chat_id
        })

        const sameChatId = chatsIds1.find((id, i) => {
            return chatsIds2[i] === id && id
        })
        ////////////////////////////////////////////////////////

        if (sameChatId) return { chatId: sameChatId, memberIds: userIds }
        await this.createChat(userIds)
    }

    async getChatsByUserId(user_id) {
        //TODO add some comments to it
        const userChats = await User.findOne({
            where: { user_id },
            include: {
                model: Chat,
                include: LastMessage,
            },
        })
        const chats = userChats.chats.map((chat) => {
            return {
                chat_id: chat.chat_id,
                lastMessage: {
                    content: chat.lastMessage.content,
                    updatedAt: chat.lastMessage.updatedAt,
                },
                unSeenMessages: chat.unSeenMessages,
            }
        })

        return await Promise.all(
            chats.map(async (chat) => {
                //TODO add comments to this algo
                const chat_id = chat.chat_id

                const unSeenMessage = await UnSeenMessage.findOne({
                    where: {
                        chat_id,
                        sender_id: { [Op.ne]: user_id },
                    },
                })
                const member = await Chat.findOne({
                    where: { chat_id },
                    include: [
                        {
                            model: User,
                            where: { user_id: { [Op.ne]: user_id } },
                            include: {
                                as: "userBio",
                                model: UserBio,
                            },
                        },
                    ],
                })
                return {
                    memberInfo: {
                        email: member.dataValues.users[0].dataValues.email,
                        ...member.dataValues.users[0].dataValues.userBio
                            .dataValues,
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
}
module.exports = new ChatService()
