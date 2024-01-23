const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// creating token
const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

// login
const login = async(req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.loginUser(email,password);
        // create token
        const token = createToken(user._id);
        res.status(200).json({email,token});
    } catch(error) {
        res.status(400).json({error : error.message});
    }
}

// signup
const signup = async(req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.signupUser(email,password);
        // create token
        const token = createToken(user._id);
        res.status(200).json({email,token});
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {login,signup}