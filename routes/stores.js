const express = require("express");
const bikesController = require("../controllers/bikes");
const { validate } = require("../middleware/validation");
const router = express.Router();

router.get("/all", bikesController.catalog);

router.post("/filter", validate.bind({ model: "stores", strict: false }));
router.post("/filter", bikesController.filter);

module.exports = router;
