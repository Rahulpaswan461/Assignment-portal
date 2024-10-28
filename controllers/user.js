const Assignment = require("../models/assignment");
const User = require("../models/user");
const mongoose = require("mongoose");

/**
 * Register a new user (admin or regular).
 * Validates name, email, password, and saves the user.
 */
async function registerUser(req, res) {
    try {
        const { name, email, password, role } = req.body;

        // Ensure all required fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Incomplete information!" });
        }

        // Create and save a new user
        let user = new User({ name, email, password, role });
        user = await user.save();

        // Return success if user is created
        return res.status(200).json({ success: "User created successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

/**
 * Log in an existing user.
 * Validates email and password, generates and returns a JWT token.
 */
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Incomplete information!" });
        }

        // Validate credentials and generate token
        const token = await User.matchPasswordAndGenerateToken(email, password);

        if (!token) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Return token in cookie
        return res.cookie("token", token).status(200).json({ success: "User logged in successfully!" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: error.message });
    }
}

/**
 * Upload an assignment for a specific admin.
 * Saves assignment details linked to the logged-in user.
 */
async function uploadAssignment(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.user._id)) {
            return res.status(400).json({ error: "Invalid user ID!" });
        }

        const { task, adminId } = req.body;

        // Create and save the assignment
        let assignment = new Assignment({
            userId: req.user._id,
            task,
            admin: adminId
        });
        assignment = await assignment.save();

        return res.status(200).json(assignment);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: error.message });
    }
}

/**
 * Fetch all admins assigned to the logged-in user's assignments.
 * Populates the admin details.
 */
async function getAllAdmins(req, res) {
    try {
        const admins = await Assignment.find({ userId: req.user._id }).populate("admin");

        if (!admins || admins.length === 0) {
            return res.status(400).json({ msg: "No admins found!" });
        }

        return res.status(200).json(admins);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: error.message });
    }
}

async function getTheDetailsOfAmins(req,res){
    try{
        const admins = await Assignment.find({userId:req.user._id}).populate("admin")
        if(!admins){
            return res.status(400).json({error:"No admins is present for the current user "});
        }

        return res.status(200).json(admins);
    }
    catch(error){
        console.log("There is some error",error.message)
        return res.status(500).json({error:"Internal Server Error : "})
    }
}

module.exports = {
    registerUser,
    loginUser,
    uploadAssignment,
    getAllAdmins
};
