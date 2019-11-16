module.exports = class CatalogController {

	constructor() {}

	show(req, res) {
		
		let user =  req.session.user;
		let userId = req.session.userId;
	
		if(userId == null)
		{
			res.redirect("/login");
			return;
		}

		res.render("catalog.ejs");
	}
}