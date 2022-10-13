const path = require("path")

class StaticService {
    async uploadFile(file) {
        if (!file) return null
        const fileName = Date.now() + file.name

        await file.mv(path.resolve("static", fileName))

        return fileName
    }
}

module.exports = new StaticService()
