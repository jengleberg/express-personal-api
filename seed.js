// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

let db = require('./models');

let workout_list = [
	{
		exercise: "Bench Press",
  		sets: 3,
  		reps: 8,
  		body_part: "Chest"

	}
];


db.Workout.create(workout_list, function(err, workout){
   if (err){
     return console.log("Error:", err);
   }

   console.log("Created " + workout._id);
   process.exit(); // we're all done! Exit the program.
 });
