const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const companyJobsSchema = new Schema({
    company_id: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    job_id: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    }
});

module.exports = mongoose.model("CompanyJob", companyJobsSchema);
