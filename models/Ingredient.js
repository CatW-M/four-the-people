const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'Category'
    },
    holdTimes: {
        type: {
            roomTemperature: Number,
            refrigerated: Number,
            frozen: Number
        }, 
        required: true,
    },
    disposal: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'Disposal'
    },
    tips: {
        type: String
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Ingredient', ingredientSchema)