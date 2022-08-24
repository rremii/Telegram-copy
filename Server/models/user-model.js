const { INTEGER, BOOLEAN, STRING } = require("sequelize")
const sequelize = require("../db")

const User = sequelize.define(
    "user",
    {
        user_id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
)
module.exports = { User }
