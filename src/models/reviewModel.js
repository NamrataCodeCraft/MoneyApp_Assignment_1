const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "user",
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Review", reviewSchema)