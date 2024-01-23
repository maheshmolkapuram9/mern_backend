const express = require("express");
const {createWorkout,
    getWorkouts,
    getAworkout,
    delteWorkout,
    updateWorkout} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// middleware
router.use(requireAuth);


//all workouts
router.get("/",getWorkouts);

//workout details
router.get("/:id",getAworkout);

//create a workout
router.post("/",createWorkout);

//delete a workout
router.delete("/:id",delteWorkout);

//update a workout
router.patch("/:id",updateWorkout);

module.exports = router;