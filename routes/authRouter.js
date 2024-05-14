const express = require("express");
const router = express.Router();
const {
  register,
  signin,
logout
} = require("../controllers/authController");
const { authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.post(
  "/register",
  register
);
router.post("/login", signin);
router.get("/logout", logout);
// router.post("/reset-password", ResetPassword);

module.exports = router;
