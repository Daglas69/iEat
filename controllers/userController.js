const UserModel = require('../models/userModel.js');
const DB = require('../database/database.js');

module.exports = class UserController {

	constructor (model) {
		this.model = new UserModel();
		
		//The router that use these methods doesnt know about anything about the class
		//So it doesnt know which value to use as this. 
		//We need to "force" the value of this with bind.
		//It would be much more simpler using functions instead of object
		this.login = this.login.bind(this);
		this.signup = this.signup.bind(this);
		this.profile = this.profile.bind(this);
		this.logout = this.logout.bind(this);
	}



	async login(req, res) {
		let message = "";
		let session = req.session;

		if (req.method == "POST")
		{
			let user = new DB.User(req.body.user_name, req.body.password);

      		try {
				let resDB = await this.model.getUser(user);
		        req.session.userId = resDB[0].id;
		        req.session.user = resDB[0];
		        res.redirect('/profile');
		    }

	        catch (err) {
	           	message = 'Wrong Credentials';
	            res.render('index.ejs',{message: message});
	        }
		}

		else 
   		{
   			res.render('index.ejs',{message: message});
   		}    
	}


	async signup(req, res) {
		let msg = { 
			message: "",
			success: null
		};

		if(req.method == "POST")
   		{
	  		let user = new DB.User(req.body.user_name, req.body.password);

	    	if (user.username.length < 5)
	    	{
	    		msg.message = "Your username has to contain at least 5 characters";
	    		msg.success = false;
	    		res.render("signup.ejs", {msg: msg});
	    		return;
	    	}

	    	if (user.password.length < 5)
	    	{
	    		msg.message = "Your password has to contain at least 5 characters";
	    		msg.success = false;
	    		res.render("signup.ejs", {msg: msg});
	    		return;
	    	}

	    	
	    	let resDB = await this.model.containsUser(user.username);
		    if (resDB == true)
		    {
		    	msg.message = "This username already exists.";
		    	msg.success = false;
	          	res.render('signup.ejs',{msg: msg});
	   		}
	   		else
	   		{
	   			try {
					await this.model.insertUser(user);
		            msg.message = "Succesfully! Your account has been created.";
			  		msg.success = true;
		    		res.render('signup.ejs',{msg: msg});
		   		}
		   		catch (err) {
		            console.log("error ocurred",err);
		            res.send({
		            	"code":400,
		                "failed":"error ocurred"
		            });
		   		}
	   		}
	   	}

  		else 
  		{
  			res.render('signup', {msg: msg});
  		}
  	}


  	//next is a reference to next function to execute (like a callback)
	async profile(req, res, next) {

		try {
			await this.model.getUserById(req.session.userId);
			console.log(req.session.user);
			res.render('profile.ejs', {user: req.session.user});
		}
		catch {
			res.render('/login', {msg: "Unexpected error."});
		}
	}


	logout(req, res) {
		//We remove the user stored in the session
		req.session.user = null;
		req.session.userId = null;

		res.redirect('/login');
	}
}