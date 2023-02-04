const express = require("express");
const storesController = require("../controllers/stores");
const { validate } = require("../middleware/validation");
const router = express.Router();

router.get("/all", storesController.all);

router.post("/filter", validate.bind({ model: "store", strict: false }));
router.post("/filter", storesController.filter);

module.exports = router;
