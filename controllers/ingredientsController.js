const Ingredient = require('../models/Ingredient');
const Category = require('../models/Category');
const Disposal = require('../models/Disposal');
const asyncHandler = require('express-async-handler');

// @desc Get all ingredients
// @route GET /ingredients

const getAllIngredients = asyncHandler(async (req, res) => {
    // Get all ingredients from MongoDB
    const ingredients = await Ingredient.find().populate('category').populate('disposal').lean()

    // Check for ingredients 
    if (!ingredients?.length) {
        return res.status(400).json({ message: 'No ingredients found' })
    }
    res.status(200).json(ingredients)
});

// @desc Create new ingredient
// @route POST /ingredients
// @access Private
const createNewIngredient = asyncHandler(async (req, res) => {
    const { name, category, disposal, holdTimes, tips } = req.body
    const existingCategory = await Category.findById(category)
    const existingDisposal = await Disposal.findById(disposal)

    // Confirm data

    if (!name || !category || !disposal ||!holdTimes) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if category exists
    if (!existingCategory) {
        return res.status(400).json({ message: 'Category not found' });
    }

    // Check if disposal exists
    if (!existingDisposal) {
        return res.status(400).json({ message: 'Disposal method not found' });
    }

    // Check for duplicate name
    const duplicate = await Ingredient.findOne({ name }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate ingredient method' })
    }

    const ingredientObject = { name, category, disposal, holdTimes, tips }

    // Create and store new ingredient 
    const ingredient = await Ingredient.create(ingredientObject)

    if (ingredient) { //created 
        res.status(201).json({ message: `New ingredient ${name} created` })
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }
})

// @desc Update a ingredient
// @route PATCH /ingredients
// @access Private
const updateIngredient = asyncHandler(async (req, res) => {
    const { id, name, category, holdTimes, disposal, tips } = req.body

    // Confirm data 
    if (!id || !name || !category || !holdTimes || !disposal ) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    
    // Does the ingredient exist to update?
    const ingredient = await Ingredient.findById(id).exec()
    
    if (!ingredient) {
        return res.status(400).json({ message: 'Ingredient not found' })
    }
    
    // Check for duplicate 
    const duplicate = await Ingredient.findById(id).exec()
    
    // Allow updates to the original ingredient
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate ingredient name' })
    }
    
    // Does the category exist?
    
    const existingCategory = await Category.findById(category)
    if (!existingCategory) {
        return res.status(400).json({ message: 'Category not found' })
    }
    
    // Does the disposal method exist?

    const existingDisposal = await Disposal.findById(disposal)
    if (!existingDisposal) {
        return res.status(400).json({ message: 'Disposal method not found' })
    }


    // Update ingredient fields

    ingredient.name = name
    ingredient.category = category
    ingredient.disposal = disposal
    ingredient.holdTimes = holdTimes
    ingredient.tips = tips


    const updatedIngredient = await ingredient.save()

    res.json({ message: `${updatedIngredient.name} updated` })
})

// @desc Delete a ingredient
// @route DELETE /ingredients
// @access Private
const deleteIngredient = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Ingredient ID Required' })
    }

    // Does the ingredient exist to delete?
    const ingredient = await Ingredient.findById(id).exec()

    if (!ingredient) {
        return res.status(400).json({ message: 'Ingredient not found' })
    }

    const result = await ingredient.deleteOne()

    const reply = `Ingredient ${ingredient.name} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllIngredients,
    createNewIngredient,
    updateIngredient,
    deleteIngredient
}