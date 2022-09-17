const { Router } = require("express")
const chatController = require("./../controllers/chat-controller")
const meController = require("./../controllers/me-controller")

const router = Router()

router.get("/me", meController.getMe)

module.exports = router
