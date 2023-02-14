const express = require('express');
const router = express.Router();
const disposalsController = require('../controllers/disposalsController');


router.route('/')
    .get(disposalsController.getAllDisposals)
    .post(disposalsController.createNewDisposal)
    .patch(disposalsController.updateDisposal)
    .delete(disposalsController.deleteDisposal)
    
module.exports = router