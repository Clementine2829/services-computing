const mongoose = require('mongoose');

const employeeJobsSchema = mongoose.Schema({
    employee_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
  },
    job_id: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    }
});

module.exports = mongoose.model("EmployeeJob", employeeJobsSchema );
