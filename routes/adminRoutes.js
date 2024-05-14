// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Routes for accessing editor reports and general statistics

router.get('/editor-reports', adminController.getEditorReports);
router.get('/general-statistics', adminController.getGeneralStatistics);

// Routes for approving or rejecting programs
router.put('/approve-program/:id', adminController.approveProgram);
router.put('/reject-program/:id', adminController.rejectProgram);

module.exports = router;
