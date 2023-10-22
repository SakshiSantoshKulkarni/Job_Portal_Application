const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        firstName: {
            type: String,
            required: [true, "first name is required"],
        },
        lastName: {
            type: String,
            required: [true, "last name is required"],
        },
        phone: {
            type: String,
            required: [true, "phone no is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        website: {
            type: String,
        },
        address: {
            type: String,
            required: [true, "address is required"],
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
            type: Number,
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


        status: {
            type: String,
            default: "pending",
        },



    },
    { timestamps: true }
);

const companyModel = mongoose.model("companies", CompanySchema);
module.exports = companyModel;