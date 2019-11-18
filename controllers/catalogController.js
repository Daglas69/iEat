module.exports = class CatalogController {

	constructor() {
		this.showCatalog = this.showCatalog.bind(this);
	}


	showCatalog(req, res) {
		let msg = {message: "", success: null}
		res.render("catalog.ejs", {msg: msg});
	}
}