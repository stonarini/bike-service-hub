const express = require("express");
const bikeController = require("../controllers/bike");
const { exists } = require("../middleware/exists");
const { validate } = require("../middleware/validation");
const router = express.Router();

router.post("/new", validate.bind({ model: "bike", strict: true }));
router.post("/new", bikeController.create);

router.use("/:id", exists.bind({ model: "bike" }));
router.get("/:id", bikeController.findById);

router.put("/:id", validate.bind({ model: "bike", strict: false }));
router.put("/:id", bikeController.update);

router.delete("/:id", bikeController.delete);

module.exports = router;
