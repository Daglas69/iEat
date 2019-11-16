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


//get handler
router.get('/', indexController.index);                   //call for index page
router.get('/login', indexController.index);              //call for login page
router.get('/logout', indexController.index);             //call for logout page
router.get('/signup', userController.signup);             //call for signup page
router.get('/profile', userController.profile);           //call for profile page
router.get('/catalog', catalogController.show);           //call for catalog page


//post handler
router.post('/login', userController.login);    //call for login post
router.post('/signup', userController.signup);  //call for signup post


module.exports = router;