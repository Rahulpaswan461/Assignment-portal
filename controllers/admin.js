const Assignment = require("../models/assignment");
const mongoose = require("mongoose");

/**
 * Fetch all assignments assigned to the current admin.
 * @route GET /api/admin/assignments
 * @access Admin
 */
async function getAllAssignments(req, res) {
    try {
        // Find assignments where the admin matches the current user's ID
        const assignments = await Assignment.find({ admin: req.user._id });

        // Return 400 if no assignments are found
        if (!assignments) {
            return res.status(400).json({ msg: "No assignments are tagged to you!" });
        }

        // Return assignments with 200 status
        return res.status(200).json(assignments);
    } catch (error) {
        console.error("Error fetching assignments:", error);
        return res.status(500).json({ msg: "Internal Server Error", error });
    }
}

/**
 * Accept an assignment by updating its status to 'accepted'.
 * @route POST /api/admin/assignments/:id/accept
 * @access Admin
 */
async function acceptAssignment(req, res) {
    try {
        // Find the assignment by ID and ensure it belongs to the current admin
        let assignment = await Assignment.findOne({ _id: req.params.id, admin: req.user._id });

        // Return 400 if the assignment is not found
        if (!assignment) {
            return res.status(400).json({ msg: "No assignment found with the given ID!" });
        }

        // Update the status to 'accepted' and save
        assignment.status = "accepted";
        await assignment.save();

        // Return updated assignment with 200 status
        return res.status(200).json(assignment);
    } catch (error) {
        console.error("Error accepting assignment:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

/**
 * Reject an assignment by updating its status to 'rejected'.
 * @route POST /api/admin/assignments/:id/reject
 * @access Admin
 */
async function rejectAssignment(req, res) {
    try {
        // Find the assignment by ID and ensure it belongs to the current admin
        let assignment = await Assignment.findOne({ _id: req.params.id, admin: req.user._id });

        // Return 400 if the assignment is not found
        if (!assignment) {
            return res.status(400).json({ msg: "No assignment found with the given ID!" });
        }

        // Update the status to 'rejected' and save
        assignment.status = "rejected";
        await assignment.save();

        // Return updated assignment with 200 status
        return res.status(200).json(assignment);
    } catch (error) {
        console.error("Error rejecting assignment:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = {
    getAllAssignments,
    acceptAssignment,
    rejectAssignment
};
