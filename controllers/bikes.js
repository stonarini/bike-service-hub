const { validateBike } = require("./validation");

module.exports = {
	catalog: (req, res) => {
		req.app.locals.DB.findAll()
			.then(response => res.status(200).json(response))
			.catch(error => console.error(error));
	},

	filter: (req, res) => {
		if (validateBike(req.body, res, false)) {
			req.app.locals.DB.find(req.body)
				.then(response => res.status(200).json(response))
				.catch(error => console.error(error));
		}
	},
};
