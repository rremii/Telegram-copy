require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const sequelize = require("./db")
const router = require("./router")
const errorMiddleware = require("./middlewares/error-middleware")

const PORT = process.env.PORT || 5000
const app = express()

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        optionSuccessStatus: 200,
    })
)
app.use("/static", express.static("static"))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({}))
app.use("/api", router)
app.use(errorMiddleware)

const startApp = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: false })
        app.listen(PORT, () => console.log(`${PORT} post is being listened`))
        console.log("Соединение с БД было успешно установлено")
    } catch (e) {
        console.log(`some error at the app start \n${e}`)
    }
}

startApp()
