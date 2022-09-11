const { Sequelize } = require("sequelize")

const { DB_NAME, DB_OWNER_NAME, DB_PASSWORD } = process.env

// const sequelize = new Sequelize(DB_NAME, DB_OWNER_NAME, DB_PASSWORD, {
//     host: "ec2-54-75-26-218.eu-west-1.compute.amazonaws.com",
//     dialect: "postgres",
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false,
//         },
//     },
// })
const sequelize = new Sequelize("TelegramCopy", "postgres", "19792005Artem", {
    host: "localhost",
    dialect: "postgres",
    dialectOptions: {
        // ssl: {
        //     require: true,
        //     rejectUnauthorized: false,
        // },
    },
})

module.exports = sequelize
