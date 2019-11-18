const DB = require('../database/database.js');

module.exports = class RecipeModel {
	
	constructor() {}


	addProcedure(procedure) {
		return new Promise((resolve, reject) => {
			db.query(`INSERT INTO ${DB.procedureTable} SET ?`, procedure, (err, res) => {
				if (err) reject();				
				else resolve(res.insertId);
			});
		});
	}

	addIngredient(ingredient) {
		return new Promise((resolve, reject) => {
			db.query(`INSERT INTO ${DB.ingredientTable} SET ?`, ingredient, (err, res) => {
				if (err) reject();
				else resolve(res.insertId);
			});	
		});	
	}

	addRecipe(recipe) {
		return new Promise((resolve, reject) => {
			db.query(`INSERT INTO ${DB.recipeTable} SET ?`, recipe, (err, res) => {
				if (err) reject();
				else resolve(res.insertId);
			});
		});		
	}

	addIngredientList(ingredientList) {
		return new Promise((resolve, reject) => {
			db.query(`INSERT INTO ${DB.ingredientListTable} SET ?`, ingredientList, (err, res) => {
				if (err) reject();
				else resolve(res.insertId);
			});
		});		
	}
}



//NOTES: In order to use async and await (to reduce complexity)
//We need to return a promise as the query to the DB do not return what we want
//and only handle result in a function
//We can use try and catch with resolve and reject functions of the promise
//or only use resolve and treat the case with an if in the controller