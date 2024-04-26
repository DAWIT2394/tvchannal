// models/Program.js

// Import necessary modules
const mongoose = require('mongoose');
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
    assignedEditor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Editor' // Reference to the Editor model
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Program = mongoose.model('Program', programSchema);

// Export the Program model
module.exports = Program;