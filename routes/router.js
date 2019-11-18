const RecipeFormController = require('../controllers/recipeFormController.js');
const CatalogController = require('../controllers/catalogController.js');
const IndexController = require('../controllers/indexController.js');
const UserController = require('../controllers/userController.js');
const DB = require('../database/database.js');
const express = require('express');


module.exports = class Router {

	constructor() 
	{
		this.indexController = new IndexController();
		this.userController = new UserController();
		this.catalogController = new CatalogController();
		this.recipeFormController = new RecipeFormController();

		this.router = express.Router();
	}

	createRoutes()
	{
		//Index route
		this.router.get('/', this.indexController.index);  

		//Routes for user requests
		this.router.get('/login', this.indexController.index);
		this.router.get('/logout', this.userController.logout);
		this.router.get('/signup', this.userController.signup);
		this.router.get('/profile', DB.validateUser, this.userController.profile);
		this.router.post('/login', this.userController.login);
		this.router.post('/signup', this.userController.signup);


		//Routes for catalog requests
		this.router.get('/catalog', DB.validateUser, this.catalogController.showCatalog);


		//Routes for recipe requests
		this.router.get('/recipe-form', DB.validateUser, this.recipeFormController.showRecipeForm);
		this.router.post('/submit-recipe', DB.validateUser, this.recipeFormController.submitRecipe);
	}
}