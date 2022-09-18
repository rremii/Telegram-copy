const { Chat, UserChat } = require("../models/chat-models/chat-model")
const { User } = require("../models/user-model")
const ApiError = require("../exceptions/api-error")
const { UserBio } = require("../models/userBio-model")
const { Op } = require("sequelize")

class ChatService {
    async createChat(userIds) {
        if (!userIds) throw ApiError.BadRequest("invalid id's")
        //TODO add validation that you cant create same chat twice
        const [id1, id2] = userIds

        // const chat = await User.findOne({
        //     where: { user_id: id1 },
        //     include: {
        //         model: Chat,
        //         include: {
        //             model: User,
        //             where: { user_id: 3 },
        //         },
        //     },
        // })

        if (id1 === id2) throw ApiError.BadRequest("wrong ids")

        const { dataValues: chatData } = await Chat.create()

        const userChatInfo = await UserChat.bulkCreate([
            { chat_id: chatData.chat_id, user_id: id1 },
            { chat_id: chatData.chat_id, user_id: id2 },
        ])

        return {
            userChatInfo,
        }
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
                            where: { user_id: { [Op.ne]: 1 } },
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

                // const chatMembers = await UserChat.findAll({
                //     where: { chat_id: chatId },
                // })
                // const [member] = chatMembers.filter((member) => {
                //     return member.dataValues.user_id !== +userId
                // })
                // const memberId = member.dataValues.user_id
                // const memberData = await UserBio.findOne({
                //     where: { user_id: memberId },
                // })
            })
        )

        // const chatsData = await User.findAll({
        //     where: { user_id: 1 },
        //     attributes: ["email"],
        //     include: {
        //         model: Chat,
        //         attributes: ["chat_id"],
        //         include: {
        //             model: User,
        //             where: { user_id: { [Op.ne]: 1 } },
        //             include: UserBio,
        //         },
        //     },
        // })
        // const { dataValues: data } = chatsData
        // const chats = data
        debugger

        // return {
        //     memberData: memberData.dataValues,
        //     chatId,
        // }

        // const chats = await UserChat.findAll({
        //     where: { user_id: userId },
        // })
        //
        // return await Promise.all(
        //     chats.map(async (chat) => {
        //         //TODO add comments to this algo
        //         const chatId = chat.dataValues.chat_id
        //         const chatMembers = await UserChat.findAll({
        //             where: { chat_id: chatId },
        //         })
        //         const [member] = chatMembers.filter((member) => {
        //             return member.dataValues.user_id !== +userId
        //         })
        //         const memberId = member.dataValues.user_id
        //         const memberData = await UserBio.findOne({
        //             where: { user_id: memberId },
        //         })
        //         return {
        //             memberData: memberData.dataValues,
        //             chatId,
        //         }
        //     })
        // )
    }
}
module.exports = new ChatService()
