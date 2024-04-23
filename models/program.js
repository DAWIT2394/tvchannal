// models/Program.js

// Import necessary modules
const mongoose = require('mongoose');

// Define the schema for the Program model
const programSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Program model based on the schema
const Program = mongoose.model('Program', programSchema);

// Export the Program model
module.exports = Program;
