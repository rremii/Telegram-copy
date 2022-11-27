const { INTEGER, STRING, DATE } = require("sequelize")
const sequelize = require("../db")

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
