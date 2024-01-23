const { Mongoose, default: mongoose } = require("mongoose");
const Workout = require("../models/Workout");

const getWorkouts = async(req,res)=>{
   const user_id = req.user._id;
   const workouts = await Workout.find({user_id}).sort({createdAt:-1});
   res.status(200).json(workouts);
}

const getAworkout = async (req,res) =>{
    const {id} = req.params;

    if(! mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Not a valid mongoose object id"});
    }

    const workout = await Workout.findById(id);
    
    if(!workout){
        return res.status(404).json({error:"No such workout"});
    }

    res.status(200).json(workout)
}

const createWorkout = async(req,res)=>{
    const {title,reps,load} = req.body;
    const user_id = req.user._id;

    let emptyFields = [];
    if (!title){
        emptyFields.push("title")
    }
    if (!load){
        emptyFields.push("load")
    }
    if (!reps){
        emptyFields.push("reps")
    }
    if (emptyFields.length > 0){
        return res.status(400).json({error:"please fill in all fields", emptyFields})
    }
    
    try{
        const workout = await Workout.create({title,reps,load,user_id});
        res.status(200).json(workout);
    }  catch (error) {
        res.status(400).json({error:error.message})
    }      
}

const delteWorkout = async (req,res)=>{
    const {id} = req.params;

    if(! mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Not a valid mongoose object id"});
    }

    const workout = await Workout.findOneAndDelete({_id:id});

    if(!workout){
        return res.status(404).json({error:"No such workout"})
    }

    res.status(200).json(workout)
}

const updateWorkout = async (req,res)=>{
    const {id} = req.params;

    if(! mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"not a valid mongoose id"});
    }

    const workout = await Workout.findOneAndUpdate({_id:id},{...req.body});

    if(!workout){
        return res.status(404).json({error:"No such workout"});
    }

    res.status(200).json(workout)
}

module.exports = {createWorkout,getWorkouts,getAworkout,delteWorkout,updateWorkout}