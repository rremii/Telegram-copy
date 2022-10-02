const { INTEGER, BOOLEAN, STRING, ARRAY, TEXT } = require("sequelize")
const sequelize = require("../../db")
const { User } = require("../user-model")
// const { UserChat } = require("./user-chat-model")

const Chat = sequelize.define(
    "chat",
    {
        chat_id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        lastMessage: {
            type: STRING,
        },
        unSeenMessages: {
            type: INTEGER,
            defaultValue: 0,
        },
    },
    {
        timestamps: false,
    }
)

const UserChat = sequelize.define(
    "user-chat",
    {
        user_chat_id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        chat_id: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: Chat,
                key: "chat_id",
            },
        },
        user_id: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "user_id",
            },
        },
    },
    {
        timestamps: false,
    }
)

Chat.belongsToMany(User, {
    through: UserChat,
    foreignKey: "chat_id",
})
User.belongsToMany(Chat, {
    through: UserChat,
    foreignKey: "user_id",
})
module.exports = { Chat, UserChat }
