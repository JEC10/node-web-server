// EXPRESS SET UP SECTION
var express = require('express'); // creates express variable to store all code in express library
var app = express(); // creates an express app and saves it in app variable by calling express function
var PORT = 3000;  // revised as best practice. All caps var name means variable won't be changed (not sure if it can be changed?)

var middleware = require('./middleware');		// in same folder so can filepath it as ./

// MIDDLEWARE SECTION moved to middleware.js
// middleware runs before a route is hit
// order in file is important; must be before the routes or would never run
// create object called middleware
// first attribute requires user to be logged in; will be route level middleware
// set its attribute to an anonymous function, takes 3 arguments, req/res/next
// requireAuthentication will run first, before body of route is called
// if user is logged in can call next and it will run the route's specific function
// if don't call next can send back an error and user won't be able to access the private information
// add middleware into the app with app.use
// this is application level middleware. Every route requires authentication so when hit a page in browser in terminal it prints
// 'private route hit!' each time & then care of next the server allow the page to be rendered.

// app.use(middleware.requireAuthentication);	// passes in middleware with app.use
app.use(middleware.logger);						// application level middleware

app.get('/about', middleware.requireAuthentication, function (req, res) {	// route level middleware
	res.send('About Us');
});

// best practice version below, using second argument (so terminal screen confirms server is working), and a variable for port so don't need to type twice
// app.listen(3000); // prior simple version using only one hardwired argument

app.listen(PORT, function () {
	console.log('Express server started on port ' + PORT);
});

// PUBLIC FOLDER VISIBLE SECTION & DEFAULT ROUTE
// __dirname (2x underscore) finds the full current folder on server. Add '/public' to expose the public folder
// no need to create a route for index.html since this is the default root filename
// in browser url localhost:3000 displays public/index.html file
app.use(express.static(__dirname + '/public')); 

// SPECIFIC ROUTES SETUP SECTION

app.get('/about', function (req, res) {
	res.send('About Us');
});

// deleted 3 lines below so that root route doesn't display text below. Instead default (index.html) is displayed
// app.get('/', function (req, res) {
//	res.send('Hello Express');
// });


// NOTES FROM PRIOR CHAPTER(S)

// this file creates a simple server that prints Hello Express & About Us at applicable routes
// in terminal run node server.js to run it
// after start server can view pages in browser
// stop server running with ctrl+C (need to restar)
// Set up steps:
// - Create a new folder: web-server
// - cd into the folder
// - run npm init, then enter through all options and yes
// - in sublime can view package.json file
// - in terminal: npm install express@4.13.2 - - save
// - in web-server create new file in sublime: server.js

// app.get takes two arguments 1) the route, 2) an anonymous function that is passed the request & response objects
// request object normally abbreviated to req; response object normally abbreviated to res
// the request object contains all info received from user: url, any json passed along, any cookies or other data
// response is what you want to send back e.g. send back a new todo item after it is created

// in browser url localhost:3000 displays "Hello Express!" (because '/' is the root directory)
// in browser url localhost:3000/about displays "About Us"

// get corresponds to an http request method
// other http methods include put, patch, delete method