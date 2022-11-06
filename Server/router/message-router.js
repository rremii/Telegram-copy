const { Router } = require("express")
const messageController = require("./../controllers/message-controller")

const router = Router()

router.post("/", messageController.addMessage)
router.put("/", messageController.editMessage)
router.delete("/:id", messageController.deleteMessage)
router.get("/:chat_id/:user_id", messageController.getMessages)

module.exports = router
