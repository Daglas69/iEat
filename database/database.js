class Database {
	
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

	static userTable() {return "users";}
	static recipeTable() {return "recipes";}
	static procedureTable() {return "procedures";}
	static ingredientTable() {return "ingredients";}
	static ingredientListTable() {return "ingredientLists";}
}


class User {
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}
}


class Recipe {
	constructor(name, category, difficulty, ownerID, procedureID) {
		this.name = name;
		this.category = category;
		this.difficulty = difficulty;
		this.ownerID = ownerID;
	}
}

class Ingredient {
	constructor (name, amount) {
		this.name = name;
		this.amount = amount;
	}
}

class Procedure {
	constructor (steps, tips, recipeID) {
		this.steps = steps;
		this.tips = tips;
		this.recipeID = recipeID
	}
}

class IngredientList {
	constructor (recipeID, ingredientID) {
		this.recipeID = recipeID;
		this.ingredientID = ingredientID;
	}
}


const userTable = Database.userTable();
const recipeTable = Database.recipeTable();
const procedureTable = Database.procedureTable();
const ingredientTable = Database.ingredientTable();
const ingredientListTable = Database.ingredientListTable();



module.exports = {
	Database,
	User, Recipe, Ingredient, Procedure, IngredientList,
	userTable, recipeTable, procedureTable, ingredientTable, ingredientListTable
}