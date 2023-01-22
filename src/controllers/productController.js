const productModel = require('../models/productModel')
const mongoose = require('mongoose')


exports.createProduct = async function (req, res) {
    try {
        const data = req.body
        const { product, price } = data
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: 'Please mention data' })
        if (!product) return res.status(400).send({ status: false, msg: "product is required" })
        if (!price) return res.status(400).send({ status: false, msg: "price is required" })
        const dbData = await productModel.findOne({product})
        if (dbData) return res.status(400).send({ status: false, msg: `${product} is already present` })

         await productModel.create(data)

        return res.status(201).send({ status: true, msg: 'product created' })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

exports.getAllProduct = async function (req, res) {
    try {
        let filter = { isDeleted: false }
        const allData = await productModel.find({ filter })
        if (!allData.length > 0) return res.status(404).send({ status: false, msg: "No product available" })

        return res.status(200).send({ status: true, msg: allData, total: allData.length })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

exports.getSingleProduct = async function (req, res) {
    try {
        const productId = req.params.productId
        if (!mongoose.isValidObjectId(productId)) return res.status(400).send({ status: false, msg: "Invalid Id" })
        let data = await productModel.findById(productId)
        if (!data || data.isDeleted == true) return res.status(404).send({ status: false, msg: "No Product Found with this id" })
       
        return res.status(200).send({ status: true, msg: data })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


exports.updateProduct = async function (req, res) {
    try {
        let productId = req.params.productId
        let { name, price } = req.body
        if (!mongoose.isValidObjectId(productId)) return res.status(400).send({ status: false, msg: "Invalid Product Id" })
        let checkId = await productModel.findOne({ isDeleted: false, _id: productId })
        if (!checkId) return res.status(404).send({ status: false, msg: "ProductId not exist or is Deleted" })
        if (name && !name.trim()) return res.status(400).send({ status: false, msg: "name is required for updation" })
        await productModel.findByIdAndUpdate({ _id: productId },  req.body )
       
        return res.status(200).send({ status: true, msg: 'updated' })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


exports.deleteProduct = async function (req, res) {
    try {
        const productId = req.params.productId
        if (!mongoose.isValidObjectId(productId)) return res.status(400).send({ status: false, msg: "Invalid Product Id" })
        let checkProduct = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!checkProduct) return res.status(404).send({ status: false, msg: "No Product found" })
        await productModel.findOneAndUpdate({ _id: productId, }, { isDeleted: true, deletedAt: new Date() })
       
        return res.status(200).send({ status: true, msg: "Successfully deleted", data: checkProduct })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}