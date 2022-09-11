const { INTEGER, BOOLEAN, STRING, ARRAY, TEXT } = require("sequelize")
const sequelize = require("../../db")
const { Chat } = require("./chat-model")
const { User } = require("../user-model")

// const UserChat = sequelize.define(
//     "user-chat",
//     {
//         user_chat_id: {
//             type: INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         chat_id: {
//             type: INTEGER,
//             allowNull: false,
//             references: {
//                 model: Chat, // 'Movies' would also work
//                 key: "chat_id",
//             },
//         },
//         user_id: {
//             type: INTEGER,
//             allowNull: false,
//             references: {
//                 model: User, // 'Movies' would also work
//                 key: "user_id",
//             },
//         },
//     },
//     {
//         timestamps: false,
//     }
// )

// module.exports = { UserChat }
