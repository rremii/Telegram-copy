const multer = require("multer")
const ApiError = require("../exceptions/api-error")

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "static/")
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        cb(ApiError.BadRequest("invalid image"), false)
    }
}
module.exports = multer({
    storage,
    fileFilter,
})
