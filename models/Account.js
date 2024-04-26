// models/Account.js

const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['hr', 'admin'],
        default: 'hr'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
