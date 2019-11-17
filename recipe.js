class Recipe {
	constructor(name, ingredients, procedure, category, difficulty) {
		this.name = name;
		this.ingredients = ingredients;
		this.procedure = procedure;
		this.category = category;
		this.difficulty = difficulty;
	}
}

class Ingredient {
	constructor (name, amount) {
		this.name = name;
		this.amount = amount;
	}
}

class Procedure {
	constructor (steps, tips) {
		this.steps = steps;
		this.tips = tips;
	}
}

module.exports = {
	Recipe,
	Ingredient,
	Procedure
}