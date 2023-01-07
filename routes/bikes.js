const express = require("express");
const bikesController = require("../controllers/bikes");
const router = express.Router();

router.get("/catalog", bikesController.catalog);

router.post("/filter", bikesController.filter);

module.exports = router;
