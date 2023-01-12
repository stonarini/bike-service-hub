const bikesRepository = require("../repository/bikesRepository");

// strict ? bike should exist : bike shouldn't exist
function bikeExists(req, res, next) {
	const id = req.params.id;
	if (id.length != 24) {
		res.status(401).json({ error: "invalid id" });
		return;
	}
	if (bikesRepository.exist(id)) {
		next();
	} else {
		res.status(404).json({ error: "not found" });
	}
}

module.exports = { bikeExists };
