const mongoose = require('mongoose')

const ApplySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    companyId: {
        type: String,
        required: true
    },
    companyInfo: {
        type: String,
        required: true
    },
    userInfo: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },


}, { timestamps: true })

const ApplyModel = mongoose.model('applications', ApplySchema)
module.exports = ApplyModel;