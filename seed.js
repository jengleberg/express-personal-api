// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

let db = require('./models');

let workout_list = [
	{
		exercise: "Bench Press",
  		sets: 3,
  		reps: 8,
  		body_part: "Chest"
	},
	{
		exercise: "Squats",
		sets: 4,
		reps: 10,
		body_part: "Legs"
	}
];



