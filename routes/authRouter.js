const express = require("express");
const router = express.Router();
const {
  signin,
logout
} = require("../controllers/authController");
const authMiddleware = require('../middleware/authentication');


// router.post(  "/register", register);
router.post("/login",authMiddleware.authenticateUser, signin);
router.get("/logout", logout);
// router.post("/reset-password", ResetPassword);

module.exports = router;
