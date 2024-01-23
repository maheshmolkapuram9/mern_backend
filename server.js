require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const app = express();

//middleware
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

// routes
app.use("/user", userRoutes);
app.use("/workouts", workoutRoutes);

//connecting to DB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`listening on port ${process.env.PORT} & Connected to DB`)
        });
    })
    .catch((error)=>console.log(error))

