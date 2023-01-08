const schema = require("../repository/mongo/schema.json");

// strict ? body must have all required bike's keys : body must have only existing keys
function validateBike(req, res, next) {
	if (!Object.keys(req.body).every(k => schema.$jsonSchema.required.includes(k))) {
		res.status(401).json({ error: "invalid request body" });
	} else if (Object.keys(req.body).length != schema.$jsonSchema.required.length && this.strict) {
		res.status(401).json({ error: "invalid request body" });
	} else {
		next();
	}
}

module.exports = { validateBike };
