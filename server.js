//Modules that node.js will be using
let express = require('express');
let bodyParser = require("body-parser");
let session = require('express-session');
let http = require('http');
let path = require('path');
let mysql = require('mysql');
let routes = require('./routes/router.js');

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

app.use('/',routes);


//Port of the server
app.listen(3000);

module.exports = app;