// routes/reportRoutes.js

const express = require('express');
const router = express.Router();
const Editorcontrollers = require('../controllers/Editorcontrollers');
const ProductionManagercontrollers = require('../controllers/ProductionManagercontrollers');
const authMiddleware = require('../middleware/authentication');

// Get all reports
router.get('/all',authMiddleware.checkIsAdmin,authMiddleware.authenticateUser, Editorcontrollers.getAllReports);

// Create a report
router.post('/', Editorcontrollers.createReport);

// Route to approve program and assign editor
router.post('/approve-program', ProductionManagercontrollers.approveProgram);

module.exports = router;
