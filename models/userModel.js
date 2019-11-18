const DB = require('../database/database.js');

module.exports = class UserModel {
	
	constructor() {}


	getUser(user) {
		let sql = `SELECT id, username FROM ${DB.userTable} WHERE username="${user.username}" and password="${user.password}"`;
		return new Promise((resolve, reject) => {
			db.query(sql, (err, result) => {
				if (result.length) resolve(result);
				else reject();
			});
		});
	}


	containsUser(username) {
		let sql = `SELECT * FROM ${DB.userTable} WHERE username="${username}"`;
		return new Promise((resolve, reject) => {
			db.query(sql, (err, result) => {
				if (result.length > 0) resolve(true);
				else resolve(false);
			});
		});
	}


	insertUser(user) {
		return new Promise((resolve, reject) => {
			db.query(`INSERT INTO ${DB.userTable} SET ?`,user, (err, result) => {
	        	if (!err) resolve();
	        	else reject(err);
	       	});
		});
	}


	getUserById(id)
	{
		let sql = `SELECT * FROM ${DB.userTable} WHERE id="${id}"`;
		return new Promise((resolve, reject) => {
			db.query(sql, (err, results) => {
				if (results.length > 0) resolve();
				else reject(); 	  
			});	
		});
	}	
}



//NOTES: In order to use async and await (to reduce complexity)
//We need to return a promise as the query to the DB do not return what we want
//and only handle result in a function
//We can use try and catch with resolve and reject functions of the promise
//or only use resolve and treat the case with an if in the controller