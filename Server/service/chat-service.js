const { Chat, UserChat } = require("../models/chat-models/chat-model")
const { User } = require("../models/user-model")

class ChatService {
    async createChat(userIds) {
        const [id1, id2] = userIds
        /////////////////
        await User.create({
            email: "email",
        })
        await User.create({
            email: "email1",
        })
        ///////////////
        const { dataValues: chatData } = await Chat.create()
        const userChatInfo = await UserChat.bulkCreate([
            { chat_id: chatData.chat_id, user_id: id1 },
            { chat_id: chatData.chat_id, user_id: id2 },
        ])

        return {
            userChatInfo,
        }
    }
}
module.exports = new ChatService()
