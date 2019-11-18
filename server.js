const Database = require('./database/database.js');
const Router = require('./routes/router.js');

class Server {

	constructor() 
	{
		//Modules that node.js will be using
		this.express = require('express');
		this.bodyParser = require("body-parser");
		this.session = require('express-session');
		this.http = require('http');
		this.path = require('path');
		this.routes = require('./routes/router.js');

		//Express is the app
		this.app = this.express();

		//Database
		this.db = new Database();
		this.db.createConnection();

		//Router
		this.routes = new Router(this.app);
		this.routes.createRoutes();
	}

	setupServer()
	{
		this.app.set('port', 3000);
		this.app.set('views', __dirname + '/views');
		this.app.set('view engine', 'ejs');
		this.app.use(this.bodyParser.urlencoded({ extended: false }));
		this.app.use(this.bodyParser.json());
		this.app.use(this.express.static(this.path.join(__dirname, 'public')));
		this.app.use(this.session({
			secret: 'keyboard cat',
		  	resave: false,
		  	saveUninitialized: true,
		  	cookie: { maxAge: 60000 }
		}));

		this.app.use('/',this.routes.router);

		//Port of the server
		this.app.listen(3000);
	}
}



/* INIT OF THE SERVER */
let server = new Server();
server.setupServer();


module.exports = server.app;