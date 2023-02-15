const foodVaultSchema = new mongoose.Schema({
    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ingredient'
    },

    owners: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'User'
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
},
{
    timestamps: true,
})

module.exports = mongoose.model('FoodVault', foodVaultSchema)