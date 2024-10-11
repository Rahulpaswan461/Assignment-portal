const Assignment = require("../models/assignment");
const mongoose = require("mongoose");

/**
 * Function to get all assignments tagged to the current admin (req.user._id).
 */
async function getAllAssignments(req, res) {
    try {
        // Find assignments where the 'admin' field matches the current user's ID (assumed to be an admin)
        const assignment = await Assignment.find({ admin: req.user._id });

        // If no assignments are found, return a 400 Bad Request response with an error message
        if (!assignment) {
            return res.status(400).json({ msg: "No assignments are tagged to you !!" });
        }

        // If assignments are found, return them with a 200 OK status
        return res.status(200).json(assignment);
    } catch (error) {
        // Log the error and return a 500 Internal Server Error response with a generic error message
        console.log("There is some error", error);
        return res.status(500).json({ msg: "Internal Server Error", error });
    }
}

/**
 * Function to accept an assignment by updating its status to 'accepted'.
 * It verifies that the assignment belongs to the current admin (req.user._id).
 */
async function acceptAssignment(req, res) {
    try {
        // Find the assignment by its ID (from req.params) and ensure it belongs to the current admin
        let assignment = await Assignment.findOne({ _id: req.params.id, admin: req.user._id });

        // If no assignment is found, return a 400 Bad Request response with an error message
        if (!assignment) {
            return res.status(400).json({ msg: "No assignment is present with the given id : " });
        }

        // Update the assignment's status to "accepted"
        assignment.status = "accepted";

    
        await assignment.save();

        // Return the updated assignment with a 200 OK status
        return res.status(200).json(assignment);
    } catch (error) {
        // Log the error and return a 500 Internal Server Error response with a generic error message
        console.log("There is some error", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

/**
 * Function to reject an assignment by updating its status to 'rejected'.
 * It first checks if the provided ID is a valid MongoDB ObjectId.
 */
async function rejectAssignment(req, res) {
    try {
        // Check if the provided ID is a valid MongoDB ObjectId
        let assignment = await Assignment.findOne({ _id: req.params.id, admin: req.user._id });

        // If no assignment is found, return a 400 Bad Request response with an error message
        if (!assignment) {
            return res.status(400).json({ msg: "No assignment is present with the given id : " });
        }

        // Update the assignment's status to "accepted"
        assignment.status = "rejected";

    
        await assignment.save();
        // Return the updated assignment with a 200 OK status
        return res.status(200).json(assignment);
    } catch (error) {
        // Log the error and return a 500 Internal Server Error response with a generic error message
        console.log("There is some error", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}


module.exports = {
    getAllAssignments, 
    acceptAssignment,  
    rejectAssignment  
};
