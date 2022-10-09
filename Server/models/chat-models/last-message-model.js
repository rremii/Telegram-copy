const sequelize = require("../../db")
const { INTEGER, STRING } = require("sequelize")
const { Chat } = require("./chat-model")

const LastMessage = sequelize.define(
    "lastMessage",
    {
        content: {
            type: STRING,
        },
        chat_id: {
            type: INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        createdAt: false,
    }
)

Chat.hasOne(LastMessage, {
    foreignKey: "chat_id",
})
LastMessage.belongsTo(Chat, {
    foreignKey: "chat_id",
})

module.exports = { LastMessage }
