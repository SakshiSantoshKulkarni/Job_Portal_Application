const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        JobTitle: {
            type: String,
            required: [true, "Job Title is Required"]
        },
        CompanyName: {
            type: String,
            required: [true, "Company Name is Required"],
        },
        JobDescription: {
            type: String,
            required: [true, "Job Description is Required"],
        },
        CompanyLocation: {
            type: String,
            required: [true, "Location is Required"],
        },
        CompanySalary: {
            type: String,
            required: [true, "Salary is Required"],
        },
        CompanyDepartment: {
            type: String,
            required: [true, " Department is Required"],
        },
        Experience: {
            type: String,
            required: [true, " Experience is Required"],
        },
        MinimumQualification: {
            type: String,
            required: [true, "Qualification is Required"],
        },

        RequiredSkills: {
            type: String,
            required: [true, "Company Skills is Required"],
        },




    },
    { timestamps: true }
);

const jobModel = mongoose.model("jobs", JobSchema);
module.exports = jobModel;