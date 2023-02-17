const FoodVault = require('../models/FoodVault')
const User = require('../models/User')


const asyncHandler = require('express-async-handler')

//desc Get all foodvaults

const getAllFoodVaults = asyncHandler(async (req, res) => {

    //Get all foodVaults from MongoDB
    const foodVaults = await FoodVault.find().lean()

    //Check for foodVaults

    if(!foodVaults?.length) {
        return res.status(400).json({ message: "No foodVaults found" })
    }
    res.status(200).json(foodVaults)
})

//@desc Create new foodVault
// @route POST /foodvaults
// @access Private
const createNewFoodVaults = asyncHandler(async (req, res) => {
    const { user, title, items } = req.body
    const existingUser = await User.findById(user)

    // Confirm data

    if (!user|| !items) {
        return res.status(400).json({ message: 'Please complete required fields' })
    }

    // Check if user exists
    if (!existingUser) {
        return res.status(400).json({ message: 'User not found' });
    }

    const foodVaultObject = { user, title, items }

    // Create and store new foodVault 
    const foodVault = await FoodVault.create(foodVaultObject)

    if (foodVault) { //created 
        res.status(201).json({ message: `New foodVault created` })
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }
})

//Need to add code to prevent multiple foodVaults to be added by one user, unless team decides otherwise

//@desc Add foodVault to FoodVault
//@route PATCH /foodvault
//@ access Private
const updateFoodVault = asyncHandler(async (req, res) => {
   const { id, user, title, items } = req.body

   //Confirm Data

   if (!id || !user) {
    return res.status(400).json({message: 'All fields are required'})
   }

   //Does the foodVault exist to update?
   const foodVault =await FoodVault.findById(id).exec()

    if (!foodVault) {
        return res.status(404).send('FoodVault not found')
    }
    
    const newItem = { foodVault, dateIn, storageMethod, expDate }

    //Update foodVault fields
    foodVault.user = user
    foodVault.title = title
    foodVault.items = foodVault.items.push({ newItem })
    
    const updatedFoodVault = await foodVault.save(

    res.json({ message: `Food Vault updated`})
    )
})

// @desc Delete a foodVault
// @route DELETE /foodVaults
// @access Private
const deleteFoodVault = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'FoodVault ID Required' })
    }

    // Does the foodVault exist to delete?
    const foodVault = await FoodVault.findById(id).exec()

    if (!foodVault) {
        return res.status(400).json({ message: 'FoodVault not found' })
    }

    const result = await foodVault.deleteOne()

    const reply = `FoodVault with ID ${result._id} deleted`

    res.json(reply)
})


module.exports = {
    getAllFoodVaults,
    createNewFoodVaults,
    updateFoodVault,
    deleteFoodVault
}