module.exports = class IndexController {
	
	constructor() {
		this.index = this.index.bind(this);
	}

	index(req, res) {
		let message = '';
  		res.render('index',{message: message});
	}
}