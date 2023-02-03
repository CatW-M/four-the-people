const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
      },
    active: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)