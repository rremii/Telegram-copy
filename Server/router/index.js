const { Router } = require("express")
const authRouter = require("./auth-router")
const chatRouter = require("./chat-router")
const usersRouter = require("./users-router")
const meRouter = require("./me-router")
const messageRouter = require("./message-router")
const AuthMiddleware = require("../middlewares/auth-middleware")

const router = Router()

router.use("/auth", authRouter)
router.use("/", AuthMiddleware, chatRouter)
router.use("/", AuthMiddleware, usersRouter)
router.use("/", AuthMiddleware, meRouter)
router.use("/messages", AuthMiddleware, messageRouter)

module.exports = router
