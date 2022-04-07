const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 150
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    },
    usertype: {
        type: String,
        default: 'employee',
        min: 7,
        max: 10
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);
