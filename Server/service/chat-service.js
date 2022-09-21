const { Chat, UserChat } = require("../models/chat-models/chat-model")
const { User } = require("../models/user-model")
const ApiError = require("../exceptions/api-error")
const { UserBio } = require("../models/userBio-model")
const { Op } = require("sequelize")

class ChatService {
    async createChat(userIds) {
        if (!userIds) throw ApiError.BadRequest("invalid id's")
        const [id1, id2] = userIds
        ////////////////////////////////////////////////////////
        // const chats1 = await UserChat.findAll({
        //     where: { user_id: id1 },
        // })
        // const chatsIds1 = chats1.map((chat) => {
        //     return chat.dataValues.chat_id
        // })
        // const chats2 = await UserChat.findAll({
        //     where: { user_id: id2 },
        // })
        // const chatsIds2 = chats2.map((chat) => {
        //     return chat.dataValues.chat_id
        // })
        //
        // const haveSameChat = chatsIds1.some((id, i) => {
        //     return chatsIds2[i] === id
        // })
        // if (haveSameChat) throw ApiError.BadRequest("this chat already exist")
        ////////////////////////////////////////////////////////

        if (id1 === id2) throw ApiError.BadRequest("wrong ids")

        const { dataValues: chatData } = await Chat.create()

        const userChatInfo = await UserChat.bulkCreate([
            { chat_id: chatData.chat_id, user_id: id1 },
            { chat_id: chatData.chat_id, user_id: id2 },
        ])

        debugger

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

        if (sameChatId) return { chatId: sameChatId, membersIds: userIds }
        await this.createChat(userIds)
    }

    async getChatsByUserId(userId) {
        const chats = await UserChat.findAll({
            where: { user_id: userId },
        })
        return await Promise.all(
            chats.map(async (chat) => {
                //TODO add comments to this algo
                const chatId = chat.dataValues.chat_id

                const member = await Chat.findOne({
                    where: { chat_id: chatId },
                    include: [
                        {
                            model: User,
                            where: { user_id: { [Op.ne]: userId } },
                            include: {
                                as: "userBio",
                                model: UserBio,
                            },
                        },
                    ],
                })
                return {
                    memberData:
                        member.dataValues.users[0].dataValues.userBio
                            .dataValues,
                    chatId,
                }
            })
        )
    }
}
module.exports = new ChatService()
