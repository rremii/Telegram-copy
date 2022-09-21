const { Router } = require("express")
const chatController = require("./../controllers/chat-controller")

const router = Router()

// router.post("/chat", chatController.createChat)
router.post("/chat", chatController.findOrCreate)
router.get("/chat/:id", chatController.getChatById)
router.get("/chatsByUserId/:userId", chatController.getChatsByUserId)

module.exports = router
