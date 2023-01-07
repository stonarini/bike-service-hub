const schema = require("../database/schema.json");

// strict ? body must have all required bike's keys : body must have only existing keys
function validateBike(body, res, strict = true) {
	if (!Object.keys(body).every(k => schema.$jsonSchema.required.includes(k))) {
		res.status(401).json({ error: "invalid request body" });
	} else if (body.length == schema.$jsonSchema.required.length && strict) {
		res.status(401).json({ error: "invalid request body" });
	}
}

module.exports = { validateBike };
