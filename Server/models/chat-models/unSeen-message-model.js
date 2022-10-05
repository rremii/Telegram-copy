const { INTEGER, BOOLEAN, STRING, ARRAY, TEXT } = require("sequelize")
const sequelize = require("../../db")
const { User } = require("../user-model")
const { Chat } = require("./chat-model")
// const { UserChat } = require("./user-chat-model")

const UnSeenMessage = sequelize.define(
    "UnSeenMessage",
    {
        amount: {
            type: INTEGER,
            defaultValue: 0,
        },
        sender_id: {
            type: INTEGER,
            allowNull: false,
        },
        chat_id: {
            type: INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
)

User.hasMany(UnSeenMessage, {
    foreignKey: "sender_id",
})
UnSeenMessage.belongsTo(User, {
    foreignKey: "sender_id",
})

Chat.hasMany(UnSeenMessage, {
    foreignKey: "chat_id",
})
UnSeenMessage.belongsTo(Chat, {
    foreignKey: "chat_id",
})

module.exports = { UnSeenMessage }
