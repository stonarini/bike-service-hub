const { bikesRepository } = require("../repository/bikesRepository");
const { storesRepository } = require("../repository/storesRepository");

function exists(req, res, next) {
	const id = req.params.id;
	if (id.length != 24) {
		res.status(401).json({ error: "invalid id" });
		return;
	}
	if ((this.model == "bike" && bikesRepository.exist(id)) || (this.model == "store" && storesRepository.exist(id))) {
		next();
	} else {
		res.status(404).json({ error: "not found" });
	}
}

module.exports = { exists };
