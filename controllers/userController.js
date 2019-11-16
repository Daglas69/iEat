module.exports = class UserController {

	constructor (model) {
		this.model = model;
		
		//The router that use these methods doesnt know about anything about the class
		//So it doesnt know which value to use as this. 
		//We need to "force" the value of this with bind.
		//It would be much more simpler using functions instead of object
		this.login = this.login.bind(this);
		this.signup = this.signup.bind(this);
		this.dashboard = this.dashboard.bind(this);
	}

	login(req, res) {
		let message = "";
		let session = req.session;

		if (req.method == "POST")
		{
			let username = req.body.user_name;
      		let password = req.body.password;
			this.model.getUser(username,password, (resDB) => {
				if (resDB != null)
	         	{
	            	req.session.userId = resDB[0].id;
	            	req.session.user = resDB[0];
	            	console.log(resDB[0].id);
	           		res.redirect('/home/dashboard');
	         	}
	         	else
	         	{
	           		message = 'Wrong Credentials';
	            	res.render('index.ejs',{message: message});
	         	}
			});
		}

		else 
   		{
   			res.render('index.ejs',{message: message});
   		}    
	}


	signup(req, res) {
		let msg = { 
			message: "",
			success: null
		};

		if(req.method == "POST")
   		{
	  		let user = {
	        	"username": req.body.user_name,
	        	"password": req.body.password
	    	}

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

	    	this.model.containsUser(user.username, (resDB) => {
		    	if (resDB == true)
		    	{
		    		msg.message = "This username already exists.";
		    		msg.success = false;
	          		res.render('signup.ejs',{msg: msg});
	   			}
	   			else 
	   			{
	   				this.model.insertUser(user, (resDB) => {
		   				if (resDB == true)
		   				{
		              		msg.message = "Succesfully! Your account has been created.";
		              		msg.success = true;
		              		res.render('signup.ejs',{msg: msg});
		   				}
		   				else 
		   				{
		              		console.log("error ocurred",error);
		              		res.send({
		                  		"code":400,
		                  		"failed":"error ocurred"
		              		});
		   				}
	   				});
	   			}
	    	});
  		}

  		else 
  		{
  			res.render('signup', {msg: msg});
  		}
  	}


	dashboard(req, res, next) {

		let user =  req.session.user;
		let userId = req.session.userId;
	
		if(userId == null)
		{
			res.redirect("/login");
			return;
		}
		
		this.model.getUserById(userId, (resDB) => {
			if (resDB == true)
			{
	      	 	console.log(user);
				res.render('profile.ejs', {user:user});	 
			}
		})
	}
}