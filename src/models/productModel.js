const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        trim: true

    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)