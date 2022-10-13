const { Router } = require("express")
const chatController = require("./../controllers/chat-controller")
const AuthMiddleware = require("../middlewares/auth-middleware")

const router = Router()

router.post("/chat", chatController.findOrCreate)
router.get("/chatsByUserId/:userId", chatController.getChatsByUserId)

module.exports = router
