const IndexController = require('../controllers/indexController.js');
const CatalogController = require('../controllers/catalogController.js');
const UserController = require('../controllers/userController.js');
const UserModel = require('../models/userModel.js');

const server = require('../server.js');

let userModel = new UserModel(server.db);
let indexController = new IndexController();
let userController = new UserController(userModel);
let catalogController = new CatalogController();

var express = require('express');
var router = express.Router();


//Function to check if the user is connected
let validateUser = (req, res, next) => {
	if (req.session.userId != null) next();
	else res.redirect('/login');
}


//Index route
router.get('/', indexController.index);  

//Routes for user requests
router.get('/login', indexController.index);
router.get('/logout', userController.logout);
router.get('/signup', userController.signup);
router.get('/profile', validateUser, userController.profile);
router.post('/login', userController.login);
router.post('/signup', userController.signup);


//Routes for recipe requests
router.get('/catalog', validateUser, catalogController.showCatalog);
router.get('/recipe-form', catalogController.showRecipeForm); //ADD VALIDATE USER
router.post('/submit-recipe', catalogController.submitRecipe); //ADD VALIDATE USER




module.exports = router;