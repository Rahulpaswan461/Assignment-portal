const Assignment = require("../models/assignment");
const User = require("../models/user");
const mongoose = require("mongoose");

/**
 * Registers a new user (admin or regular user).
 * Validates the request body for name, email, and password, and creates a new user if validation passes.
 */
async function registerUser(req, res) {
    try {
        // Extract user details from the request body
        const { name, email, password, role } = req.body;

        // Check if any required fields are missing
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Information incomplete !!!" });
        }

        // Create a new User instance with the provided details
        let user = new User({
            name: name,
            email: email,
            password: password,
            role: role
        });

        // Save the user to the database
        user = await user.save();

        // If the user could not be created, send a 400 error response
        if (!user) {
            return res.status(400).json({ msg: "No user created !!" });
        }

        // If successful, return a 200 response with the created user
        return res.status(200).json({ success: "User created successfully"});
    } catch (error) {
        // Log the error and return a 500 Internal Server Error response
        console.log("There is some error", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

/**
 * Logs in an existing user (admin or regular user).
 * Validates the request body for email and password, and generates a JWT token if credentials match.
 */
async function loginUser(req, res) {
    try {
        // Extract login details from the request body
        const { email, password } = req.body;

        // Check if any required fields are missing
        if (!email || !password) {
            return res.status(400).json({ msg: "Incomplete information !!" });
        }

        // Attempt to match the password and generate a JWT token
        const token = await User.matchPasswordAndGenerateToken(email, password);

        // If the credentials are invalid, send a 400 error response
        if (!token) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // If successful, set the token in a cookie and return it in the response
        return res.cookie("token", token).status(200).json({success: "user logged in successfully !!"})
    } catch (error) {
        // Log the error and return a 500 Internal Server Error response
        console.log("There is some error", error);
        return res.status(500).json({ msg:error.message });
    }
}

/**
 * Uploads an assignment for a specific admin.
 * Validates the admin's ID and the logged-in user's ID before saving the assignment.
 */
async function uploadAssignment(req, res) {
    try {
        // Validate that the logged-in user's ID is a valid MongoDB ObjectID
        if (!mongoose.isValidObjectId(req.user._id)) {
            return res.status(400).json({ error: "Invalid user id : " });
        }

        // Extract the task from the request body
        const { task, adminId } = req.body;

        // Create a new Assignment instance
        let assignment = new Assignment({
            userId: req.user._id, // ID of the user uploading the assignment
            task: task,           // Task details
            admin: adminId  // Admin ID to whom the task is assigned
        });

        // Save the assignment to the database
        assignment = await assignment.save();

        // If the assignment could not be created, send a 400 error response
        if (!assignment) {
            return res.status(400).json({ msg: "No assignment created !!" });
        }

        // If successful, return the created assignment
        return res.status(200).json(assignment);
    } catch (error) {
        // Log the error and return a 500 Internal Server Error response
        console.log("There is some error", error);
        return res.status(500).json({ msg: error.message});
    }
}


async function getAllAdmins(req, res) {
    try {
    
        // Find all assignments for the logged-in user and populate the 'admin' field
        const admins = await Assignment.find({ userId: req.user._id }).populate("admin");

        // If no admins are found, send a 400 error response
        if (!admins || admins.length === 0) {
            return res.status(400).json({ msg: "No admins are present !!" });
        }

        // If successful, return the list of admins
        return res.status(200).json(admins);
    } catch (error) {
        // Log the error and return a 500 Internal Server Error response
        console.log("There is some error", error);
        return res.status(500).json({ msg: error.message });
    }
}


module.exports = {
    registerUser,      
    loginUser,        
    uploadAssignment,  
    getAllAdmins       
};
