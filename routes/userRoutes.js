const express = require('express')
const {
    loginController, registerController, authController, applyCompanyController, getAllNotificationController, deleteAllNotificationController, getAllCompaniesController, userApplicationsController, createJobController, applyToJobController, candidateApplicationsController } = require("../controllers/userCtrl");
const authMiddleware = require('../middlewares/authMiddleware')
//router object

const router = express.Router()


//routes
//Login ||Post
router.post('/login', loginController)

//Register ||post
router.post('/register', registerController)

//Register || post
router.post('/register', registerController)

//Auth ||Post
router.post('/getUserData', authMiddleware, authController)

//APPly Doctor || POST
router.post("/apply-company", authMiddleware, applyCompanyController);
module.exports = router;

//Notification ||Post
router.post("/get-all-notifications", authMiddleware, getAllNotificationController);

router.post("/delete-all-notifications", authMiddleware, deleteAllNotificationController);

//get All companies
router.get('/getAllCompanies', authMiddleware, getAllCompaniesController)

// //Apply Job
// router.post('/apply-job', authMiddleware, applyJobController);

//Applications List
router.get('/user-applications', authMiddleware, userApplicationsController)

//apply job 
router.post('/apply-to-job', authMiddleware, applyToJobController)

//Applications-list
router.get('/candidate-applications', authMiddleware, candidateApplicationsController)
module.exports = router;