require("dotenv").config()

const express = require("express");
const { connectMongoDB } = require("./connection");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { checkForAuthenticatedUser } = require("./middlewares/authentication");
const adminRoute = require("./routes/admin");

const PORT = process.env.PORT || 8000;
const app = express();

// Connect to MongoDB
connectMongoDB(process.env.MONGO_URL)
  .then(() => console.log("Database connected successfully!"))
  .catch((error) => console.log("Error connecting to database:", error));

// Middleware setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(checkForAuthenticatedUser("token"));

// Default route
app.get("/", (req, res) => {
  return res.send("From the server");
});

// User and admin routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
