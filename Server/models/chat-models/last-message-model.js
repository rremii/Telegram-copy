const sequelize = require("../../db")
const { INTEGER, STRING } = require("sequelize")
const { Chat } = require("./chat-model")
//TODO reference it to the message due to its bugging when you delete the last one,and change add message method dut to it
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
    onDelete: "cascade",
})

module.exports = { LastMessage }
