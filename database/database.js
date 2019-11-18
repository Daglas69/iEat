module.exports = class Database {
	
	constructor() 
	{
		this.mysql = require('mysql');
		this.connection = null;
	}

	createConnection()
	{
		//initialize connection to DB
		this.connection = this.mysql.createConnection({
			host     : 'localhost',
		    user     : 'root',
		    password : 'L1@informatique',
		    database : 'ieat'
		});

		this.connection.connect();
		global.db = this.connection;
	}


	//Function to check if the user is connected
	static validateUser (req, res, next) {
		if (req.session.userId != null) next();
		else res.redirect('/login');
	}
}