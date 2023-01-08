const { validateBike } = require("../middleware/validation");

module.exports = {
	catalog: (req, res) => {
		req.app.locals.DB.findAll().then(response => res.status(200).json(response));
	},

	filter: (req, res) => {
		req.app.locals.DB.find(req.body).then(response => res.status(200).json(response));
	},
};
