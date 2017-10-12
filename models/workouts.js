var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var WorkoutSchema = new Schema({
  exercise: String,
  sets: Number,
  reps: Number,
  body_part: String
 });

var Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;