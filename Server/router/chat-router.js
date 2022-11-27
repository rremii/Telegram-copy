const { Router } = require("express")
const chatController = require("../controllers/chat-controller")

const router = Router()

router.post("/chat", chatController.findOrCreate)
router.get("/chatsByUserId/:userId", chatController.getChatsByUserId)
router.delete("/chat", chatController.deleteChat)

module.exports = router
