// require express and other modules
var express = require('express'),
 app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



/************
 * DATABASE *
 ************/

var db = require('./models');



let profile = [
  {
    name: "Jeff Engleberg",
    github_link: "https://github.com/jengleberg",
    github_profile_image: "https://github.com/jengleberg",
    current_city: "Denver",
    pets: [{name: "Domino", type: "Dog", breed: "Jack Russel Terrier"}]
  }
];

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    I_have_updated_the_api_endpoints: true, 
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/jengleberg/express-personal-api/README.md", 
    base_url: "https://afternoon-cove-59387.herokuapp.com/", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "My Profile"}, 
      {method: "GET", path: "/api/workouts", description: "This shows all of my workouts"},
      {method: "GET", path: "/api/workouts/:id", description: "This shows one workout"},
      {method: "POST", path: "/api/workouts", description: "This creates a new workout"},
      {method: "PUT", path: "/api/workouts/:id", description: "This updates a workout"},
      {method: "DELETE", path: "/api/workouts/:id", description: "This deletes a workout"},
    ]
  });
});

app.get('/api/profile', function(req, res) {
  res.json(profile);
});


// Show all workouts

app.get('/api/workouts', function (req, res) {
  db.Workout.find().exec(function(err, workouts) {
    if (err) {return console.log("Index error: " + err); }
    res.json(workouts);
  });
});

// Show one workout
app.get('api/workouts/:id', function(req, res) {
  db.Workout.findOne({_id: req.params.id}, function(err, data) {
    res.json(data);
  });
});

app.post('/api/workouts', function(req, res) {
  var newWorkout = new db.Workout({
      exercise: req.body.exercise,
      sets: req.body.sets,
      reps: req.body.reps,
      body_part: req.body.body_part
  });


newWorkout.save(function(err, workouts) {
  if (err) {
    return console.log("Error is: " + err);
    }
    console.log("Saved");
    res.json(workouts);
  });
});

// Update workout
app.put('/api/workouts/:id', function(req, res) {
  db.Workout.findOne({_id: req.params.id}, function(err, workout) {
    if (err) {
      return console.log("Error is " + err);
    }
    workout.exercise = req.body.exercise;
    workout.sets = req.body.sets;
    workout.reps = req.body.reps;
    workout.body_part = req.body.body_part;
    workout.save();
    res.json(workouts);
  });
});

// Delete workout
app.delete('/api/workouts/:id', function(req, res) {
  var workoutId = req.params.id;
  db.Workout.findOneAndRemove({_id: workoutId }, function(err, deletedWorkout) {
    res.send("Workout was deleted!");
  });
});
  


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
