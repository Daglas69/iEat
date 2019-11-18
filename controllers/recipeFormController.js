const RecipeModel = require('../models/recipeModel.js');
const DB = require('../database/database.js');

module.exports = class RecipeFormController {

	constructor() {
		this.model = new RecipeModel();
		
		this.showRecipeForm = this.showRecipeForm.bind(this);
		this.submitRecipe = this.submitRecipe.bind(this);
	}


	showRecipeForm(req, res) {
		let msg = {message: "", success:null};
		res.render("recipe-form", {msg: msg});
	}


	//The code would be easier without try and catch 
	//We could remove it if we suppose that the INSERT query will always be correct
	//But during the development of the project It is good to have it
	async submitRecipe(req, res) {
		if (req.method == "POST")
		{
			/* Insert recipe */
			let recipe = new DB.Recipe(
				req.body.recipe_name,
				req.body.recipe_category,
				req.body.recipe_difficulty,
				req.session.userId
			);
			
			try {
				let recipeID = await this.model.addRecipe(recipe);

				try {
					/* Insert the procedure */
					let procedure = new DB.Procedure(req.body.recipe_procedure, req.body.recipe_tips, recipeID);
					let procedureID = await this.model.addProcedure(procedure);
		
					/* Insert ingredients and Ingredient list */
					let ing, ingID, ingList, resDB;
					let ingredients = Array.isArray(req.body.ingredients) ? req.body.ingredients : [req.body.ingredients]; //convert to array 
					for (let i=0; i<ingredients.length; ++i) 
					{
						try {
							ing = new DB.Ingredient(ingredients[i], req.body.nbIngredients[i]);
							ingID = await this.model.addIngredient(ing);
							
							//Insert ingredient in ingredient list (=array of ingredients for a recipe i)
							try {
								ingList = new DB.IngredientList(recipeID, ingID);
								await this.model.addIngredientList(ingList);
							}
							catch {
								res.render('recipe-form.ejs', {msg: "Error to insert an ingredient list in the database"});
							}
						}
						catch (err) {
							res.render('recipe-form.ejs', {msg: "Error to insert an ingredient in the database"});
						} 
					}

					let msg = {message:"Your recipe has been added", success: true};
					res.render('recipe-form.ejs', {msg: msg});
				}
				catch (err) {
					res.render('recipe-form.ejs', {msg: "Error to insert the procedure in the database"});
				}
			}
			catch (err) {
				res.render('recipe-form.ejs', {msg: "Error to insert the recipe in the database"});
			}
		}
	}
}