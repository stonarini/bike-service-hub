const { validateBike } = require("../middleware/validation");

module.exports = {
	findById: (req, res) => {
		const id = req.params.id;
		req.app.locals.DB.findById(id).then(bike => (bike ? res.status(200).json(bike) : res.status(404).json({ error: "not found" })));
	},

	create: (req, res) => {
		req.app.locals.DB.create(req.body).then(r => (r.insertedId ? res.status(201).json({ created: req.body.id }) : res.status(500).json({ error: "error creating bike" })));
	},

	update: (req, res) => {
		const id = req.params.id;
		req.app.locals.DB.update(id, req.body).then(r => (r.modifiedCount ? res.status(200).json({ updated: id }) : res.status(404).json({ error: "not found" })));
	},

	delete: (req, res) => {
		const id = req.params.id;
		req.app.locals.DB.delete(id).then(r => (r.deletedCount ? res.status(200).json({ deleted: id }) : res.status(404).json({ error: "not found" })));
	},
};
