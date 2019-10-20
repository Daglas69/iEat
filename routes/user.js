/* Handler for user log in */
exports.login = (req, res) => {
	let message = '';
   	let sess = req.session; 

   	if(req.method == "POST")
   	{
      	let username = req.body.user_name;
      	let password = req.body.password;
      	let sql = "SELECT id, username FROM `user` WHERE `username`='"+username+"' and password = '"+password+"'";                           
      	db.query(sql, (err, results) => {      
        	if(results.length)
         	{
            	req.session.userId = results[0].id;
            	req.session.user = results[0];
            	console.log(results[0].id);
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
};



/* Handler for user registration */
exports.signup = (req, res) => {
	
	message = '';
   	if(req.method == "POST")
   	{
		let user = {
      		"username": req.body.user_name,
      		"password": req.body.password
  		}
		
		db.query('INSERT INTO user SET ?',user, (err, result) => {
			if (!err)
			{
				message = "Succesfully! Your account has been created.";
				res.render('signup.ejs',{message: message});
			}
			else {
				console.log("error ocurred",error);
	    		res.send({
	      			"code":400,
	      			"failed":"error ocurred"
	    		})
	  		}
      	});
	} 
   	else 
   	{
      res.render('signup');
  	}
};



/* Handler for user dashboard request */
exports.dashboard = (req, res, next) => {
	let user =  req.session.user;
	let userId = req.session.userId;
	
	if(userId == null)
	{
		res.redirect("/home/login");
		return;
	}

	let sql = "SELECT * FROM `user` WHERE `id`='"+userId+"'";
	db.query(sql, (err, results) => {
		console.log(results); 

		res.render('profile.ejs', {user:user});	  	  
	});	 
};