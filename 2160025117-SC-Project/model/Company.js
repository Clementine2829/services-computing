const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    address: {
        type: String,
        required: true,
        min: 5,
        max: 150
    },
    manager: {
        type: String,
        required: false,
        min: 5,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Company", companySchema);
