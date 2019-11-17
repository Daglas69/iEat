const Recipe = require('../recipe.js');

module.exports = class CatalogController {

	constructor() {
		this.showCatalog = this.showCatalog.bind(this);
		this.showRecipeForm = this.showRecipeForm.bind(this);
		this.submitRecipe = this.submitRecipe.bind(this);
	}


	showCatalog(req, res) {
		res.render("catalog.ejs");
	}


	showRecipeForm(req, res) {
		res.render("recipe-form.ejs");
	}


	submitRecipe(req, res) {
		if (req.method == "POST")
		{
			let procedure = new Recipe.Procedure(req.body.recipe_procedure, req.body.recipe_tips);
			
			let ingredients = [];

			for (let i=0; i<req.body.ingredients.length; ++i) {
				ingredients.push(new Recipe.Ingredient(req.body.ingredients[i], req.body.nbIngredients[i]));
			}

			let recipe = new Recipe.Recipe(
				req.body.recipe_name,
				ingredients,
				procedure,
				req.body.recipe_category,
				req.body.recipe_difficulty
			)

			console.log(recipe);
		}
	}
}