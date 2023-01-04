var express = require("express");
var router = express.Router();
const schema = require("../database/schema.json");

function validateBike(body, res, strict = true) {
	if (!body.every(k => schema.$jsonSchema.required.includes(k))) {
		res.status(401).json({ error: "invalid request body" });
	} else if (body.length == schema.$jsonSchema.required.length && strict) {
		res.status(401).json({ error: "invalid request body" });
	}
}

router.get("/:id", function (req, res) {
	const id = req.params.id;
	req.app.locals.DB.findOne({ id }, { _id: 0 })
		.then(bike => (bike ? res.status(200).json(bike) : res.status(404).json({ error: "not found" })))
		.catch(error => console.error(error));
});

router.post("/new", function (req, res) {
	const body = json.parse(req.body);
	validateBike(body);
	req.app.locals.DB.insertOne(body)
		.then(r => (r.insertedId ? res.status(201).json({ created: body.id }) : res.status(500).json({ error: "error creating bike" })))
		.catch(error => console.error(error));
});

router.put("/:id", function (req, res) {
	const id = req.params.id;
	const body = json.parse(req.body);
	validateBike(body, false);
	req.app.locals.DB.updateOne({ id }, { $set: body })
		.then(r => (r.modifiedCountbike ? res.status(200).json({ updated: id }) : res.status(404).json({ error: "not found" })))
		.catch(error => console.error(error));
});

router.delete("/:id", function (req, res) {
	const id = req.params.id;
	req.app.locals.DB.deleteOne({ id })
		.then(r => (r.deletedCount ? res.status(200).json({ deleted: id }) : res.status(404).json({ error: "not found" })))
		.catch(error => console.error(error));
});

module.exports = router;
