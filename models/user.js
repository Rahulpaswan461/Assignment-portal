const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const { createTokenForAuthenticateUser } = require("../services/JWTauth");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type:String,
        required:true,
    },
    role:{
        type: String,
        enum:["user","admin"],
        default:"user"
    },
    createdAt:{
        type: Date,
        default:Date.now
    }

},{timestamps: true})

userSchema.pre("save",async function(next){
    const user = this;
    if(!user.isModified("password")) return next()
    
    try{
      const salt = await bcrypt.genSalt(10)

      const hashedPassword = await bcrypt.hash(user.password,salt)

      user.password = hashedPassword

      next()
    }
    catch(error){
       return next(error)
    }

})

userSchema.static("matchPasswordAndGenerateToken",async function(email,password){
    const user = await this.findOne({email})

    if(!user){
        throw new Error("Inavalid username or password")
    }
     
    const hashedPassword = user.password
    
    const isMatch = await bcrypt.compare(password, hashedPassword)

    if(isMatch){
        const token = createTokenForAuthenticateUser(user)
        return token
    }
    else{
        throw new Error("Invalid username or password ")
    }
})

const User = mongoose.model("user",userSchema)

module.exports = User