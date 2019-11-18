const RecipeModel = require('../models/recipeModel.js');
const Recipe = require('../database/recipe.js');

module.exports = class RecipeFormController {

	constructor() {
		this.model = new RecipeModel();
		
		this.showRecipeForm = this.showRecipeForm.bind(this);
		this.submitRecipe = this.submitRecipe.bind(this);
	}


	showRecipeForm(req, res) {
		res.render("recipe-form", {msg: ""});
	}


	//The code would be easier without try and catch 
	//We could remove it if we suppose that the INSERT query will always be correct
	//But during the development of the project It is good to have it
	async submitRecipe(req, res) {
		if (req.method == "POST")
		{
			/* Insert recipe */
			let recipe = new Recipe.Recipe(
				req.body.recipe_name,
				req.body.recipe_category,
				req.body.recipe_difficulty,
				req.session.userId
			);
			
			try {
				let recipeID = await this.model.addRecipe(recipe);

				try {
					/* Insert the procedure */
					let procedure = new Recipe.Procedure(req.body.recipe_procedure, req.body.recipe_tips, recipeID);
					let procedureID = await this.model.addProcedure(procedure);
		
					/* Insert ingredients and Ingredient list */
					let ing, ingID, ingList, resDB;
					let ingredients = Array.isArray(req.body.ingredients) ? req.body.ingredients : [req.body.ingredients]; //convert to array 
					for (let i=0; i<ingredients.length; ++i) 
					{
						try {
							ing = new Recipe.Ingredient(ingredients[i], req.body.nbIngredients[i]);
							ingID = await this.model.addIngredient(ing);
							
							//Insert ingredient in ingredient list (=array of ingredients for a recipe i)
							try {
								ingList = new Recipe.IngredientList(recipeID, ingID);
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

					res.redirect('/catalog');
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




	/* Static functions to add and remove ingredients from the recipe form */

	//Not the best way to do it... But very efficient
	static addIngredient() {
	    let list = document.getElementById("ingredient-list");
	   	let candidate = document.getElementById("candidate");

	   	if (candidate.value.length == 0) return false;

	   	let child = document.createElement('div');
	   	child.setAttribute("class", "form-group vcenter");

	   	let nbIngredients = "";
	   	for (let i=1; i<=20; ++i) nbIngredients+=`<option>${i}</option>`;

	   	child.innerHTML = `
	   		<input type"text" class="list-group-item col-md-6 col-sm-offset-4" name="ingredients"
	   			value="${candidate.value}" readonly>
	   		</input>
	   		<div class="col-md-1">
	   			<select class="form-control" name="nbIngredients">
	   				${nbIngredients}
	   			</select>
	   		</div>
	   		<a href="#" onclick="removeIngredient('${child.id}')">
          		<span class="glyphicon glyphicon-remove"></span>
        	</a>
	   	`;

	    list.appendChild(child);
	}

	static removeIngredient(ingredientID) {
		let list = document.getElementById("ingredient-list");
		list.removeChild(document.getElementById(ingredientID));
	}
}