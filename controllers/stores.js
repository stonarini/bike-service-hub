const { storesRepository } = require("../repository/storesRepository");

module.exports = {
	all: (req, res) => {
		storesRepository.findAll().then(response => res.status(200).json(response));
	},

	filter: (req, res) => {
		storesRepository.find(req.body).then(response => res.status(200).json(response));
	},
};
