const { validateBike } = require("./validation");

module.exports = {

	findById: (req, res) => {
		const id = req.params.id;
		req.app.locals.DB.findById(id)
			.then(bike => (bike ? res.status(200).json(bike) : res.status(404).json({ error: "not found" })))
			.catch(error => console.error(error));
	},

	create: (req, res) => {
		validateBike(req.body);
		req.app.locals.DB.create(req.body)
			.then(r => (r.insertedId ? res.status(201).json({ created: req.body.id }) : res.status(500).json({ error: "error creating bike" })))
			.catch(error => console.error(error));
	},

	update: (req, res) => {
		const id = req.params.id;
		validateBike(req.body, false);
		req.app.locals.DB.update(id, req.body)
			.then(r => (r.modifiedCountbike ? res.status(200).json({ updated: id }) : res.status(404).json({ error: "not found" })))
			.catch(error => console.error(error));
	},

	delete: (req, res) => {
		const id = req.params.id;
		req.app.locals.DB.delete(id)
			.then(r => (r.deletedCount ? res.status(200).json({ deleted: id }) : res.status(404).json({ error: "not found" })))
			.catch(error => console.error(error));
	}

}
