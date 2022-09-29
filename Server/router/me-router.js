const { Router } = require("express")
const chatController = require("./../controllers/chat-controller")
const meController = require("./../controllers/me-controller")
const UploadMiddleware = require("../middlewares/upload-middleware")

const router = Router()

router.get("/me", meController.getMe)
router.post(
    "/avatar",
    // UploadMiddleware.single("profilePic"),
    meController.changeAvatar
)

module.exports = router
