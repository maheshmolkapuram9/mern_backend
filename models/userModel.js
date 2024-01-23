const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    }
});

// Static signup method
userSchema.statics.signupUser = async function(email,password){
    // validation
    if (!email || !password){
        throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)){
        throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)){
        throw Error("Password is not strong enogh");
    }

    // existing check of email
    const exist = await this.findOne({email});
    if (exist) {
        throw Error("Email is already in use")
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // user data saved to DB 
    const user = await this.create({email, password:hashedPassword});
    return user;
}

// static login method
userSchema.statics.loginUser = async function(email,password){
    // validation
    if (!email || !password){
        throw Error("All fields must be filled");
    }

    // email validation
    const user = await this.findOne({email});
    if (!user){
        throw Error("Invalid email");
    }

    // email and password match validation
    const match = await bcrypt.compare(password, user.password);
    if (!match){
        throw Error("invalid password")
    }

    return user
}

module.exports = mongoose.model("User",userSchema);