const express = require("express");
const bikesController = require("../controllers/bikes");
const { validateBike } = require("../middleware/validation");
const router = express.Router();

router.get("/catalog", bikesController.catalog);

router.post("/filter", validateBike.bind({ strict: false }));
router.post("/filter", bikesController.filter);

module.exports = router;
