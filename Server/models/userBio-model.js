const {
    INTEGER,
    BOOLEAN,
    STRING,
    BLOB,
    DataTypes,
    DATE,
    NOW,
} = require("sequelize")
const sequelize = require("../db")
const { User } = require("./user-model")

const UserBio = sequelize.define(
    "user-bio",
    {
        userBio_id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: STRING,
            allowNull: false,
        },
        lastName: { type: STRING },
        profilePic: { type: STRING },
        lastOnline: { type: DATE, defaultValue: NOW },
        user_id: {
            type: INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
)
User.hasOne(UserBio, {
    foreignKey: "user_id",
    as: "userBio",
})
UserBio.belongsTo(User, {
    foreignKey: "user_id",
})

module.exports = { UserBio }
