const mongoose = require("mongoose");

/**
 * Connect to MongoDB using the provided connection string.
 */
function connectMongoDB(path) {
    return mongoose.connect(path);
}

module.exports = {
    connectMongoDB
};
