const express = require("express");
const bikesController = require("../controllers/bikes");
const { validate } = require("../middleware/validation");
const router = express.Router();

router.get("/catalog", bikesController.catalog);

router.post("/filter", validate.bind({ model: "bike", strict: false }));
router.post("/filter", bikesController.filter);

module.exports = router;
