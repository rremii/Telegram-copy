const path = require("path")

class StaticService {
    async uploadFile(file) {
        if (!file) return null
        const fileName = Date.now() + file.name

        //TODO add jpg format to input on front
        await file.mv(path.resolve("static", fileName))

        return fileName
    }
}

module.exports = new StaticService()
