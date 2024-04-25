// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const Editorcontrollers = require('../controllers/Editorcontrollers');

// Get all reports
router.get('/', Editorcontrollers.getAllReports);

// Create a report
router.post('/', Editorcontrollers.createReport);

module.exports = router;
