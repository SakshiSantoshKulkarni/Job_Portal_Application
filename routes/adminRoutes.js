const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllUsersController, getAllCompaniesController, changeAccountStatusController } = require('../controllers/adminCtrl')
//Get Method || Users
router.get('/getAllUsers', authMiddleware, getAllUsersController)

//get method ||Companies
router.get('/getAllCompanies', authMiddleware, getAllCompaniesController)

//Post Account Status
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController)

module.exports = router