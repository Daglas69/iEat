module.exports = class CatalogController {

	constructor() {
		this.showCatalog = this.showCatalog.bind(this);
	}


	showCatalog(req, res) {
		res.render("catalog.ejs");
	}
}