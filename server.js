//Modules that node.js will be using
let express = require('express');
let bodyParser = require("body-parser");
var session = require('express-session');
let routes = require('./routes');
let user = require('./routes/user');
let http = require('http');
let path = require('path');
let mysql = require('mysql');

//initialize express
let app = express();

//initialize connection to DB
let connection = mysql.createConnection({
	host     : 'localhost',
    user     : 'root',
    password : 'L1@informatique',
    database : 'ieat'
});
connection.connect();
global.db = connection;


// set up all environments
app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

//Port of the server
app.listen(3000);


//get handler
app.get('/', routes.index); //call for main index page
app.get('/login', routes.index); //call for login page
app.get('/signup', user.signup); //call for signup page
app.get('/home/dashboard', user.dashboard); //call for dashboard page after login


//post handler
app.post('/login', user.login); //call for login post
app.post('/signup', user.signup); //call for signup post