const { Router } = require("express")
const path = require("path")
const fs = require("fs")
const authRouter = require("./auth-router")
const chatRouter = require("./chat-router")
const usersRouter = require("./users-router")
const meRouter = require("./me-router")
const { Candidate } = require("../models/candidate-model")
const { User } = require("../models/user-model")
const { UserBio } = require("../models/userBio-model")
const { Chat, UserChat } = require("../models/chat-models/chat-model")
const { ChatMessage } = require("../models/chat-models/chat-message-model")
const { Op } = require("sequelize")

const router = Router()

router.use("/auth", authRouter)
router.use("/", chatRouter)
router.use("/", usersRouter)
router.use("/", meRouter)

router.use("/getcandidates", async (request, response) => {
    const candidates = await Candidate.findAll()
    response.json({ candidates })
})
router.use("/getusers", async (request, response) => {
    const users = await UserBio.findAll()

    response.json({ users })
})
router.use("/chat123", async (request, response) => {
    // const chats = await Chat.findAll({
    //     include: {
    //         model: User,
    //         where: {
    //             [Op.or]: [{ user_id: 1 }, { user_id: { [Op.ne]: 1 } }],
    //         },
    //     },
    // })

    const chatsData = await User.findOne({
        where: { user_id: 1 },
        attributes: ["email"],
        include: {
            model: Chat,
            attributes: ["chat_id"],
            include: {
                model: User,
                where: { user_id: { [Op.ne]: 1 } },
                include: UserBio,
            },
        },
    })

    // const res = await UserChat.findAll({
    //     where: { chat_id: 1 },
    //     include: {
    //         model: User,
    //         where: { user_id: { [Op.ne]: 1 } },
    //         as: "user",
    //     },
    // })

    response.json({ chatsData })
})

module.exports = router
