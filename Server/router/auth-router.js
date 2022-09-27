const { Router } = require("express")
const { check } = require("express-validator")
const authController = require("../controllers/auth-controller")
const AuthMiddleware = require("../middlewares/auth-middleware")
const UploadMiddleware = require("../middlewares/upload-middleware")

const router = Router()

router.post("/candidate", authController.createCandidate)
// router.post('/registration', UploadMiddleware.single('profilePic'), authController.registration)
router.post("/registration", authController.registration)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.get("/refresh", authController.refresh)

module.exports = router
