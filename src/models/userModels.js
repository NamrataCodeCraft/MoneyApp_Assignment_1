const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    name: {
        type:String
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)