const Disposal = require('../models/Disposal');
const asyncHandler = require('express-async-handler');

// @desc Get all disposals
// @route GET /disposals

const getAllDisposals = asyncHandler(async (req, res) => {
    // Get all disposals from MongoDB
    const disposals = await Disposal.find().lean()

    // Check for disposals 
    if (!disposals?.length) {
        return res.status(400).json({ message: 'No disposals found' })
    }
    res.json(disposals)
});

// @desc Create new disposal
// @route POST /disposals
// @access Private
const createNewDisposal = asyncHandler(async (req, res) => {
    const { name, description } = req.body

    // Confirm data
    if (!name || !description) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate name
    const duplicate = await Disposal.findOne({ name }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate disposal method' })
    }

    const disposalObject = { name, description }

    // Create and store new disposal 
    const disposal = await Disposal.create(disposalObject)

    if (disposal) { //created 
        res.status(201).json({ message: `New disposal ${name} created` })
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }
})

// @desc Update a disposal
// @route PATCH /disposals
// @access Private
const updateDisposal = asyncHandler(async (req, res) => {
    const { id, name, description } = req.body

    // Confirm data 
    if (!id || !name || !description ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the disposal exist to update?
    const disposal = await Disposal.findById(id).exec()

    if (!disposal) {
        return res.status(400).json({ message: 'Disposal method not found' })
    }

    // Check for duplicate 
    const duplicate = await Disposal.findOne({ name }).lean().exec()

    // Allow updates to the original disposal
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate disposal name' })
    }

    disposal.name = name
    disposal.description = description

    const updatedDisposal = await disposal.save()

    res.json({ message: `${updatedDisposal.name} updated` })
})

// @desc Delete a disposal
// @route DELETE /disposals
// @access Private
const deleteDisposal = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Disposal ID Required' })
    }

    // Does the disposal exist to delete?
    const disposal = await Disposal.findById(id).exec()

    if (!disposal) {
        return res.status(400).json({ message: 'Disposal not found' })
    }

    const result = await disposal.deleteOne()

    const reply = `Disposal ${disposal.name} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllDisposals,
    createNewDisposal,
    updateDisposal,
    deleteDisposal
}