const ApplyModel = require("../models/ApplyModel");
const companyModel = require("../models/companyModel");
const userModel = require("../models/userModel");
const jobsModel = require("../models/JobsModel");
const ApplyJobModel = require("../models/ApplyJobModel");
const getCompanyInfoController = async (req, res) => {
    try {
        const company = await companyModel.findOne({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            message: "company data fetch success",
            data: company,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in Fetching company Details",
        });
    }
};

// // update doc profile
const updateProfileController = async (req, res) => {
    try {
        const company = await companyModel.findOneAndUpdate(
            { userId: req.body.userId },
            req.body
        );
        res.status(201).send({
            success: true,
            message: "Company Profile Updated",
            data: company,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Company Profile Update issue",
            error,
        });
    }
};
//get single company 
const getCompanyByIdController = async (req, res) => {
    try {
        const company = await companyModel.findOne({ _id: req.body.companyId })
        res.status(200).send({
            success: true,
            message: 'single company info fetch',
            data: company
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in single company info"
        })
    }

}

const companyApplicationsController = async (req, res) => {
    try {
        const company = await companyModel.findOne({ userId: req.body.userId })
        const applications = await ApplyModel.find({ companyId: company._id, })
        res.status(200).send({
            success: true,
            message: 'Company Applications Fetched Successfully',
            data: applications,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error in getting Applications List'

        })
    }
}

const updateStatusController = async (req, res) => {
    try {
        const { applicationsId, status } = req.body
        const applications = await ApplyModel.findByIdAndUpdate(applicationsId, { status })
        const user = await userModel.findOne({ _id: applications.userId });
        const notification = user.notification
        notification.push({
            type: 'Status-Updated',
            message: `Your Application has been ${status} for An Interview`,
            onClickPath: '/user/company-applications',
        })
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Application status Updated',
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error in update status'
        })
    }
}

// Create Job Controller
const createJobController = async (req, res) => {
    try {
        const newJob = await jobsModel({ ...req.body });
        await newJob.save();
        res.status(201).send({
            success: true,
            message: "Job Created Successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error While Creating Job",
        });
    }
};

//fetch all jobs 
const getJobController = async (req, res) => {
    try {
        // Fetch all jobs from the database
        const jobs = await jobsModel.find();

        return res.status(200).json({
            success: true,
            data: jobs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while fetching jobs.',
            error: error.message,
        });
    }
};

//get single job details on details page
const getJobByIdController = async (req, res) => {
    try {
        const job = await jobsModel.findOne({ _id: req.body.jobId })
        res.status(200).send({
            success: true,
            message: 'single job info fetched',
            data: job
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting company details"
        })
    }
}






const jobApplicationsController = async (req, res) => {
    try {
        const job = await jobsModel.findOne({ userId: req.body.userId })
        const applications = await ApplyJobModel.find({
            jobId: job._id,
        })
        console.log(applications);
        res.status(200).send({
            success: true,
            message: 'Company Applications Fetched Successfully',
            data: applications,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error in getting Applications List'

        })
    }
}

const updatedStatusController = async (req, res) => {
    try {
        const { applyId, status } = req.body
        const apply = await ApplyJobModel.findByIdAndUpdate(applyId, { status })
        const user = await userModel.findOne({ _id: apply.userId })
        const notification = user.notification
        notification.push({
            type: "status-updated",
            message: `Your Application has been ${status} for An Interview`,
            onClickPath: '/company-applications',
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Application Status Updated',
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error In Update Status'
        })
    }
}

const deleteJobController = async (req, res) => {
}
module.exports = { getCompanyInfoController, updateProfileController, getCompanyByIdController, companyApplicationsController, updateStatusController, createJobController, getJobController, getJobByIdController, jobApplicationsController, updatedStatusController, deleteJobController };