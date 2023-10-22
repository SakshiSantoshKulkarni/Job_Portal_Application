const mongoose = require('mongoose')

const ApplyJobSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    jobId: {
        type: String,
        required: true
    },
    jobInfo: {
        type: String,
        required: true
    },
    userInfo: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },

    status: {
        type: String,
        required: true,
        default: 'pending'
    },


}, { timestamps: true })

const ApplyJobModel = mongoose.model('candidate-applications', ApplyJobSchema)
module.exports = ApplyJobModel;