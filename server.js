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

let Workout = require("./models/workouts");

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
    I_have_updated_the_api_endpoints: true, // Updated
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/jengleberg/express-personal-api/README.md", // Updated
    base_url: "https://afternoon-cove-59387.herokuapp.com/", // Updated
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // Updated
      {method: "POST", path: "/api/workouts", description: "E.g. Create a new workout"} // Updated
    ]
  });
});

app.get('/api/profile', function(req, res) {
  res.json(profile);
});

app.get('/api/workouts', function(req, res) {
  res.json(Workout);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
