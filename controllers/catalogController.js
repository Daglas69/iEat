module.exports = class CatalogController {

	constructor() {
		THIS.MODEL = NEW MODEL
		this.showCatalog = this.showCatalog.bind(this);
	}


	showCatalog(req, res) {
		let msg = {message: "", success: null}
		res.render("catalog.ejs", {msg: msg});
	}
}