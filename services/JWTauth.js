const Jwt = require("jsonwebtoken");

// Create a JWT token for user authentication
function createTokenForAuthenticateUser(user) {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return Jwt.sign(payload, process.env.SECRET,{expiresIn:'2h'}); // Sign the token with the payload and secret
}

// Verify the provided JWT token
function verifyToken(token) {
  return Jwt.verify(token, process.env.SECRET); // Verify the token using the secret
}

module.exports = {
  createTokenForAuthenticateUser,
  verifyToken,
};
