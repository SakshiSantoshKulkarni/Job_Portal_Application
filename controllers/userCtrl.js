const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const companyModel = require('../models/companyModel')
const ApplyModel = require('../models/ApplyModel')
const ApplyJobModel = require('../models/ApplyJobModel')

//register callback
const registerController = async (req, res) => {
    try {
        const exisitingUser = await userModel.findOne({ email: req.body.email });
        if (exisitingUser) {
            return res
                .status(200)
                .send({ message: "User Already Exist", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: "Register Sucessfully", success: true });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Register Controller ${error.message}`,
        });
    }
};


// login callback
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(200)
                .send({ message: "user not found", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res
                .status(200)
                .send({ message: "Invlid EMail or Password", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(200).send({ message: "Login Success", success: true, token });
    } catch (error) {
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }
};
const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: 'user not found',
                success: false,

            })
        } else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'auth error',
            success: false,
            error
        })
    }
}
//Apply Company
const applyCompanyController = async (req, res) => {
    try {
        const newCompany = await companyModel({ ...req.body, status: "pending" });
        await newCompany.save();
        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification;
        notification.push({
            type: "apply-company-request",
            message: `${newCompany.firstName} ${newCompany.lastName} Has Applied For A Company Account`,
            data: {
                companyId: newCompany._id,
                name: newCompany.firstName + " " + newCompany.lastName,
                onClickPath: "/admin/companies",
            },
        });
        await userModel.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).send({
            success: true,
            message: "Company Account Applied SUccessfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error WHile Applying For Company",
        });
    }
};

//notification controller
const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        const seennotification = user.seennotification;
        const notification = user.notification;
        seennotification.push(...notification);
        user.notification = [];
        user.seennotification = notification;
        const updatedUser = await user.save();
        res.status(200).send({
            success: true,
            message: "all notification marked as read",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error in notification",
            success: false,
            error,
        });
    }
};
//delete notifications
const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.notification = [];
        user.seennotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Notifications Deleted successfully",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "unable to delete all notifications",
            error,
        });
    }
};

//Get All Companies
const getAllCompaniesController = async (req, res) => {
    try {
        const companies = await companyModel.find({ status: 'approved' })
        res.status(200).send({
            success: true,
            message: 'Company Lists fetched successfully',
            data: companies
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error While fetching Company'
        })
    }
}

//apply job
const applyJobController = async (req, res) => {
    try {
        req.body.status = 'pending'
        const newApplication = new ApplyModel(req.body)
        await newApplication.save()
        const user = await userModel.findOne({ _id: req.body.companyInfo.userId });
        user.notification.push({
            type: 'New-apply-request',
            message: `A New Application Request from ${req.body.userInfo.name}`,
            onClickPath: '/user/applications'
        })
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Applied Job Successfully'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error while applying job"
        })
    }
}

//Applications List
const userApplicationsController = async (req, res) => {
    try {
        const applications = await ApplyModel.find({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: 'Users Applications Fetch Successfully',
            data: applications
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting Applications list"
        })
    }
}

//apply-to-job controller
const applyToJobController = async (req, res) => {
    try {
        req.body.status = "pending";
        const newApply = new ApplyJobModel(req.body)
        await newApply.save()
        const user = await userModel.findOne({ _id: req.body.jobInfo.userId })
        user.notification.push({
            type: "new-application-request",
            message: `A New Application Request from ${req.body.userInfo.name}`,
            onClickPath: '/user/applications'
        })
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Applied job Successfully'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error while apply to job"
        })
    }
}

const candidateApplicationsController = async (req, res) => {
    try {
        const candidateapplications = await ApplyJobModel.find({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: 'Users Applications Fetch Successfully',
            data: candidateapplications
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting Applications list"
        })
    }
}



module.exports = { loginController, registerController, authController, applyCompanyController, getAllNotificationController, deleteAllNotificationController, getAllCompaniesController, applyJobController, userApplicationsController, applyToJobController, candidateApplicationsController }