const multer = require("multer")
const ApiError = require("../exceptions/api-error")

const storage = multer.diskStorage({
    destination(req, file, cb) {
        debugger
        cb(null, "static/")
    },
    filename(req, file, cb) {
        cb(null, `${new Date().toLocaleString()}-${file.originalname}`)
    },
})
const fileFilter = (req, file, cb) => {
    debugger
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
