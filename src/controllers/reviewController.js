const mongoose = require('mongoose')
const reviewModel = require('../models/reviewModel')
const userModels = require('../models/userModels')

exports.createReview = async function (req, res) {
    try {
        const { userId, description } = req.body
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, msg: "Please mention data" })
        if (!userId) return res.status(400).send({ status: false, msg: "userId is required" })
        if (!description) return res.status(400).send({ status: false, msg: "description is required" })
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "Invalid userId" })
        const checkUser = await userModels.findOne({ _id: userId })
        if (!checkUser) return res.status(404).send({ status: false, msg: "Procut not found, create new Product" })

        await reviewModel.create(req.body)

       return  res.status(201).send({status:true,msg:'created review'})

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

exports.getReview = async (req, res) => {
    try {
        const reviweID = req.params.id;
        if (!mongoose.isValidObjectId(reviweID)) return res.status(400).send({ status: false, msg: "valid reviwe " })
        if (!reviweID) return res.status(400).send({ status: false, msg: "userId is required" })
        const reviwe = await reviewModel.findOne({ _id: reviweID }).populate('userId')

        if (!reviwe) return res.status(400).send({ status: false, msg: "not review there" })

        return res.status(200).send({ status: true, msg: 'review details', reviwe })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

exports.deleteReviwe = async function (req, res) {
    try {
        const reviweID = req.params.id;
        if (!mongoose.isValidObjectId(reviweID)) return res.status(400).send({ status: false, msg: "valid reviwe " })
        if (!reviweID) return res.status(400).send({ status: false, msg: "userId is required" })
        const reviwe = await reviewModel.findOne({ _id: reviweID })
        if (!reviwe) return res.status(404).send({ status: false, msg: "review not found, " })

        await reviewModel.findByIdAndDelete(reviweID)

        return res.status(200).send({ status: true, msg: 'deleted review' })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

