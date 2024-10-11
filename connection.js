const mongoose = require("mongoose")

function connectMongoDB(path){
    return mongoose.connect(path)
}

module.exports = {
    connectMongoDB
}