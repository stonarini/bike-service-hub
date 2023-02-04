const schema = require("../db/schema.json");

// strict ? body must have all required model's keys : body must have only existing keys
function validate(req, res, next) {
	if (!Object.keys(req.body).every(k => schema[this.model].$jsonSchema.required.includes(k))) {
		res.status(401).json({ error: "invalid request body" });
	} else if (Object.keys(req.body).length != schema[this.model].$jsonSchema.required.length && this.strict) {
		res.status(401).json({ error: "invalid request body" });
	} else {
		next();
	}
}

module.exports = { validate };
