const { Router } = require("express")
const path = require("path")
const fs = require("fs")
const authRouter = require("./auth-router")
const chatRouter = require("./chat-router")
const usersRouter = require("./users-router")
const meRouter = require("./me-router")
const messageRouter = require("./message-router")
const { Candidate } = require("../models/candidate-model")
const { User } = require("../models/user-model")
const { UserBio } = require("../models/userBio-model")
const { Chat, UserChat } = require("../models/chat-models/chat-model")
const { ChatMessage } = require("../models/chat-models/chat-message-model")
const { Op } = require("sequelize")
const AuthMiddleware = require("../middlewares/auth-middleware")

const router = Router()

router.use("/auth", authRouter)
router.use("/", AuthMiddleware, chatRouter)
router.use("/", AuthMiddleware, usersRouter)
router.use("/", AuthMiddleware, meRouter)
router.use("/messages", AuthMiddleware, messageRouter)

router.use("/getcandidates", async (request, response) => {
    const candidates = await Candidate.findAll()
    response.json({ candidates })
})
router.use("/getusers", async (request, response) => {
    const users = await UserBio.findAll()

    response.json({ users })
})
router.use("/chat123", async (request, response) => {
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
    response.json({ chatsData })
})

module.exports = router
