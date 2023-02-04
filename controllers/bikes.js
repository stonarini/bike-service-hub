const { bikesRepository } = require("../repository/bikesRepository");

module.exports = {
	catalog: (req, res) => {
		bikesRepository.findAll().then(response => res.status(200).json(response));
	},

	filter: (req, res) => {
		bikesRepository.find(req.body).then(response => res.status(200).json(response));
	},
};
