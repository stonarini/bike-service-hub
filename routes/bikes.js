var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/catalog", function (req, res) {
	req.app.locals.DB.find({})
		.toArray()
		.then(response => res.status(200).json(response))
		.catch(error => console.error(error));
});

module.exports = router;
