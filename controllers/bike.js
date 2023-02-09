const { bikesRepository } = require("../repository/bikesRepository");
const { bikesService } = require("../service/bikeService");

module.exports = {
	findById: (req, res) => {
		const id = req.params.id;
		bikesRepository.findById(id).then(bike => (bike ? res.status(200).json(bike) : res.status(404).json({ error: "not found" })));
	},

	create: (req, res) => {
		bikesRepository.create(req.body).then(r => (r.insertedId ? res.status(201).json({ created: r.insertedId }) : res.status(500).json({ error: "error creating bike" })));
	},

	update: (req, res) => {
		const id = req.params.id;
		bikesRepository.update(id, req.body).then(r => (r.modifiedCount ? res.status(200).json({ updated: id }) : res.status(404).json({ error: "not found" })));
	},

	delete: (req, res) => {
		const id = req.params.id;
		bikesRepository.delete(id).then(r => (r.deletedCount ? res.status(200).json({ deleted: id }) : res.status(404).json({ error: "not found" })));
	},

	rent: (req, res) => {
		bikesService.rentBike(req.body).then(r => (r ? res.status(201).json({ message: "reserved" }) : res.status(409).json({ error: "selected dates are unavailable" })));
	},
};
