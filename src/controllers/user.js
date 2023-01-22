const userModels = require('../models/userModels')
const jwt = require('jsonwebtoken')
const singup = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name) return res.status(400).send({ status: false, msg: "name is requierd" })
        if (!email) return res.status(400).send({ status: false, msg: "email is requierd" })
        if (!password) return res.status(400).send({ status: false, msg: "password is requierd" })

        await userModels.create(req.body)
        return res.status(201).send({ status: true, msg: 'created' })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) return res.status(400).send({ status: false, msg: "email is requierd" })

        const user = userModels.findOne({ email, password })

        if (!user) return res.status(400).send({ status: false, msg: "password not match" })

        const token = jwt.sign({ id: user._id }, 'eytuixfcgvjhb',);

        return res.status(200).send({ status: true, msg: "login success", token })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { login, singup }