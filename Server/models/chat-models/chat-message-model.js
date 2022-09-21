const { INTEGER, BOOLEAN, STRING, ARRAY, TEXT } = require("sequelize")
const sequelize = require("../../db")
const { User } = require("../user-model")
const { Chat } = require("./chat-model")

const ChatMessage = sequelize.define(
    "chat-message",
    {
        chat_message_id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: STRING,
            allowNull: false,
        },
        chat_id: {
            type: INTEGER,
            allowNull: false,
        },
        sender_id: {
            type: INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
)

Chat.hasMany(ChatMessage, {
    foreignKey: "chat_id",
})
ChatMessage.belongsTo(Chat, {
    foreignKey: "chat_id",
})

User.hasMany(ChatMessage, {
    foreignKey: "sender_id",
})
ChatMessage.belongsTo(Chat, {
    foreignKey: "sender_id",
})

module.exports = { ChatMessage }
