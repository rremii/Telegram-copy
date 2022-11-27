const { Router } = require("express")
const authController = require("../controllers/auth-controller")

const router = Router()

router.post("/candidate", authController.createCandidate)
router.post("/registration", authController.registration)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.get("/refresh", authController.refresh)

module.exports = router
