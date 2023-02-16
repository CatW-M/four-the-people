const mongoose = require('mongoose')

const foodVaultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: String,
    items: [{
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Ingredient'
        },

        dateIn: {
            type: String,
            required: true
        },

        storageMethod: {
            type: String,
            required: true
        },

        expDate: {
            type: String,
            required: true
        }
    }]
},
{
    timestamps: true,
})

module.exports = mongoose.model('FoodVault', foodVaultSchema)
