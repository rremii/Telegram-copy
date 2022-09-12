const { Router } = require("express")
const path = require("path")
const fs = require("fs")
const authRouter = require("./auth-router")
const chatRouter = require("./chat-router")
const usersRouter = require("./users-router")
const { Candidate } = require("../models/candidate-model")
const { User } = require("../models/user-model")
const { UserBio } = require("../models/userBio-model")
const { Chat, UserChat } = require("../models/chat-models/chat-model")
const { ChatMessage } = require("../models/chat-models/chat-message-model")

const router = Router()

router.use("/auth", authRouter)
router.use("/", chatRouter)
router.use("/", usersRouter)

router.use("/getcandidates", async (request, response) => {
    const candidates = await Candidate.findAll()
    response.json({ candidates })
})
router.use("/getusers", async (request, response) => {
    const users = await UserBio.findAll()

    response.json({ users })
})
router.use("/chat123", async (request, response) => {
    const user = await User.create({
        email: "noruto2021@gmail.com",
    })
    const userBio = await UserBio.create({
        firstName: "Artem",
        lastName: "Romanov",
        user_id: 1,
    })
    // await Chat.create()
    // await Chat.create()
    // await UserChat.create({
    //     chat_id: 1,
    //     user_id: 1,
    // })
    // await UserChat.create({
    //     chat_id: 2,
    //     user_id: 1,
    // })
    // await ChatMessage.create({
    //     content: "some cool message",
    //     chat_id: 1,
    //     sender_id: 1,
    // })
    // await ChatMessage.create({
    //     content: "some cool message 2",
    //     chat_id: 2,
    //     sender_id: 1,
    // })
    //
    // const chats = await Chat.findAll()
    // const userChat = await UserChat.findAll()
    // const chatMessages = await ChatMessage.findAll()
    // const chatMessages = await ChatMessage.create({
    //     chat_id: 1,
    //     sender_id: 1,
    //     content: "qwe",
    // })

    response.json({ user, userBio })
})

module.exports = router
