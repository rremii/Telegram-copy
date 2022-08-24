const { Router } = require("express")
const path = require("path")
const fs = require("fs")
const authRouter = require("./auth-router")
const { Candidate } = require("../models/candidate-model")
const { User } = require("../models/user-model")
const { UserBio } = require("../models/userBio-model")

const router = Router()

router.use("/auth", authRouter)

router.use("/getcandidates", async (request, response) => {
    const candidates = await Candidate.findAll()
    response.json({ candidates })
})
router.use("/getusers", async (request, response) => {
    const users = await UserBio.findAll()

    response.json({ users })
})

module.exports = router
