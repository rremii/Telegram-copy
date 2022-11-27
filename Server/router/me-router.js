const { Router } = require("express")
const meController = require("../controllers/me-controller")

const router = Router()

router.get("/me", meController.getMe)
router.post("/avatar", meController.changeAvatar)
router.put("/edit", meController.editUserBio)

module.exports = router
