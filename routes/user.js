const express = require("express");
const { registerUser, loginUser, uploadAssignment, getAllAdmins } = require("../controllers/user");
const { userAuth } = require("../middlewares/authorization");

const router = express.Router();

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Upload assignment (requires user authentication)
router.post("/upload", userAuth, uploadAssignment);

// Get all admins for the logged-in user (requires user authentication)
router.get("/admins", userAuth, getAllAdmins);

module.exports = router;
