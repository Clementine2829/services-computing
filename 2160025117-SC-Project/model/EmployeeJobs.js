const mongoose = require('mongoose');

const employeeJobsSchema = mongoose.Schema({
    employee_id: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    },
    job_id: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    }
});

module.exports = mongoose.model("EmployeeJob", employeeJobsSchema );
