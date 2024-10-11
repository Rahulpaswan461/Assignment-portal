const express = require("express");
const { getAllAssignments, acceptAssignment, rejectAssignment } = require("../controllers/admin");
const { adminAuth } = require("../middlewares/authorization");

const router = express.Router();

// Get all assignments (requires admin authentication)
router.get("/assignments", adminAuth, getAllAssignments);

// Accept an assignment (requires admin authentication)
router.post("/assignments/:id/accept", adminAuth, acceptAssignment);

// Reject an assignment (requires admin authentication)
router.post("/assignments/:id/reject", adminAuth, rejectAssignment);

module.exports = router;
