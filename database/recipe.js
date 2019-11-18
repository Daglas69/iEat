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

module.exports = {
	Recipe,
	Ingredient,
	Procedure,
	IngredientList
}