const { Sequelize } = require("sequelize")

const { DB_NAME, DB_OWNER_NAME, DB_PASSWORD } = process.env

const sequelize = new Sequelize(DB_NAME, DB_OWNER_NAME, DB_PASSWORD, {
    host: "dpg-ce5o0esgqg4941106t1g-a.frankfurt-postgres.render.com",
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})

module.exports = sequelize
