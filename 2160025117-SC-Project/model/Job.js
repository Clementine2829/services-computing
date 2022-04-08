const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 5,
        max: 100
    },
    location: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    description: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Job", jobSchema);
