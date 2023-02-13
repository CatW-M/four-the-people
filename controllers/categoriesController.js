const Category = require('../models/Category');
const asyncHandler = require('express-async-handler');

// @desc Get all categories
// @route GET /categories

const getAllCategories = asyncHandler(async (req, res) => {
    // Get all categories from MongoDB
    const categories = await Category.find().lean()

    // Check for categories 
    if (!categories?.length) {
        return res.status(400).json({ message: 'No categories found' })
    }
    res.json(categories)
});

// @desc Create new category
// @route POST /categories
// @access Private
const createNewCategory = asyncHandler(async (req, res) => {
    const { name } = req.body

    // Confirm data
    if (!name) {
        return res.status(400).json({ message: 'Name is required' })
    }

    // Check for duplicate name
    const duplicate = await Category.findOne({ name }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate category' })
    }

    // Create and store new category 
    const category = await Category.create(userObject)

    if (category) { //created 
        res.status(201).json({ message: `New category ${name} created` })
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }
})

// @desc Update a category
// @route PATCH /categories
// @access Private
const updateCategory = asyncHandler(async (req, res) => {
    const { id, name } = req.body

    // Confirm data 
    if (!id || !name ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the category exist to update?
    const category = await Category.findById(id).exec()

    if (!category) {
        return res.status(400).json({ message: 'Category not found' })
    }

    // Check for duplicate 
    const duplicate = await Category.findOne({ name }).lean().exec()

    // Allow updates to the original category
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate category name' })
    }

    category.name = name

    const updatedCategory = await category.save()

    res.json({ message: `${updatedCategory.name} updated` })
})

// @desc Delete a category
// @route DELETE /categories
// @access Private
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Category ID Required' })
    }

    // Does the category exist to delete?
    const category = await Category.findById(id).exec()

    if (!category) {
        return res.status(400).json({ message: 'Category not found' })
    }

    const result = await category.deleteOne()

    const reply = `Category ${category.name} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllCategories,
    createNewCategory,
    updateCategory,
    deleteCategory
}