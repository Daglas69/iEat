module.exports = class UserModel {
	
	constructor(db) {
		this.db = db;
	}

	getUser(username, password, callback) {
		let sql = "SELECT id, username FROM `users` WHERE `username`='"+username+"' and password = '"+password+"'";
      	db.query(sql, (err, results) => {      
        	if(results.length) callback(results);
         	else callback(null);
      	}); 	
	}


	containsUser(username, callback) {
		let sql = 'SELECT * FROM users WHERE username="'+username+'"';
		db.query(sql, (err, result) => {
			if (result.length == 0) callback(false);
			else callback(true);
		});
	}


	insertUser(user, callback) {
		db.query('INSERT INTO users SET ?',user, (err, result) => {
        	if (err) callback(false);
        	else callback(true);
       	});
	}


	getUserById(id, callback)
	{
		let sql = "SELECT * FROM `users` WHERE `id`='"+id+"'";
		db.query(sql, (err, results) => {
			if (results.length == 0) callback(false);
			else callback(true); 	  
		});	
	}	
}