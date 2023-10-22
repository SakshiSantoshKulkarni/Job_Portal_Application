const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { getCompanyInfoController, updateProfileController, getCompanyByIdController, companyApplicationsController, updateStatusController, createJobController, getJobController, getJobByIdController, jobApplicationsController, updatedStatusController } = require("../controllers/companyCtrl");
const router = express.Router();

//POST SINGLE Company INFO
router.post("/getCompanyInfo", authMiddleware, getCompanyInfoController);

// //POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST Get Single company infomation
router.post('/getCompanyById', authMiddleware, getCompanyByIdController)

//GET Applications
router.get('/company-applications', authMiddleware, companyApplicationsController)

//Post Update Status
router.post('/update-status', authMiddleware, updateStatusController)

//Create Job
router.post('/create-job', authMiddleware, createJobController)

//fetch Job
router.get('/getAllJobs', authMiddleware, getJobController)

//POST  Get single company info on jobdetails page when clicking on view details
router.post('/getJobById', authMiddleware, getJobByIdController)

// Get job applications 
router.get('/job-applications', authMiddleware, jobApplicationsController)

//POST //Update status new
router.post('/updated-status', authMiddleware, updatedStatusController)




module.exports = router;