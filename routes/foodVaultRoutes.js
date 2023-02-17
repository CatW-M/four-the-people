const express = require('express');
const router = express.Router();
const foodVaultsController = require('../controllers/foodVaultsController');


router.route('/')
    .get(foodVaultsController.getAllFoodVaults)
    .post(foodVaultsController.createNewFoodVaults)
    .patch(foodVaultsController.updateFoodVault)
    .delete(foodVaultsController.deleteFoodVault)
    
module.exports = router