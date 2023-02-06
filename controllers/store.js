const { storesRepository } = require("../repository/storesRepository");

module.exports = {
	findById: (req, res) => {
		const id = req.params.id;
		storesRepository.findById(id).then(store => (store ? res.status(200).json(store) : res.status(404).json({ error: "not found" })));
	},

	create: (req, res) => {
		storesRepository.create(req.body).then(r => (r.insertedId ? res.status(201).json({ created: r.insertedId }) : res.status(500).json({ error: "error creating store" })));
	},

	update: (req, res) => {
		const id = req.params.id;
		storesRepository.update(id, req.body).then(r => (r.modifiedCount ? res.status(200).json({ updated: id }) : res.status(404).json({ error: "not found" })));
	},

	delete: (req, res) => {
		const id = req.params.id;
		storesRepository.delete(id).then(r => (r.deletedCount ? res.status(200).json({ deleted: id }) : res.status(404).json({ error: "not found" })));
	},
};
