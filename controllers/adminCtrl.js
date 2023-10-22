const companyModel = require('../models/companyModel')
const userModel = require('../models/userModel')

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message: 'Users Data List',
            data: users,

        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error while fetching users',
            error
        })
    }


}

const getAllCompaniesController = async (req, res) => {
    try {
        const companies = await companyModel.find({})
        res.status(200).send({
            success: true,
            message: 'Companies Data List',
            data: companies,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while fetching companies',
            error
        })
    }
}
// company account status
const changeAccountStatusController = async (req, res) => {
    try {
        const { companyId, status } = req.body;
        const company = await companyModel.findByIdAndUpdate(companyId, { status });
        const user = await userModel.findOne({ _id: company.userId });
        const notification = user.notification;
        notification.push({
            type: "company-account-request-updated",
            message: `Your Company Account Request Has ${status} `,
            onClickPath: "/notification",
        });
        user.isCompany = status === "approved" ? true : false;
        await user.save();
        res.status(201).send({
            success: true,
            message: "Account Status Updated",
            data: company,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror in Account Status",
            error,
        });
    }
};

module.exports = { getAllUsersController, getAllCompaniesController, changeAccountStatusController };