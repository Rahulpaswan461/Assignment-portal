/**
 * Middleware to restrict 'admin' users from creating tasks.
 * Denies access to task creation for users with the role 'admin'.
 */
function userAuth(req, res, next) {
    // Deny access if the user is an admin
    if (req.user.role === 'admin') {
        return res.status(403).json({ error: "Admin can't create tasks" });
    }
    next(); // Proceed if the user is not an admin
}

/**
 * Middleware to restrict 'user' roles from accessing admin-only routes.
 * Denies access to certain routes for users with the role 'user'.
 */
function adminAuth(req, res, next) {
    // Deny access if the user is a regular user
    if (req.user.role === 'user') {
        return res.status(403).json({ error: "User can't access the assignment !!" });
    }
    next(); // Proceed if the user is an admin
}

module.exports = {
    userAuth,
    adminAuth
};
