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
    storage: [{
        method: String,
        holdTime: Number
    }],
    disposal: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'Disposal'
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Ingredient', ingredientSchema)