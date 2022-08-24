const { INTEGER, BOOLEAN, STRING, BIGINT, TIME, DATE } = require("sequelize")
const sequelize = require("../db")
const { User } = require("./user-model")

const fiveMin = 1000 * 60 * 5

const Candidate = sequelize.define(
    "candidate",
    {
        candidate_id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: STRING,
            allowNull: false,
        },
        code: {
            type: STRING,
            allowNull: false,
        },
        expireTime: {
            type: DATE,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
)

module.exports = {
    Candidate,
    fiveMin,
}
