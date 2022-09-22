const { Router } = require("express")
const messageController = require("./../controllers/message-controller")

const router = Router()

router.post("/", messageController.addMessage)
router.get("/:chat_id", messageController.getMessages)

module.exports = router
