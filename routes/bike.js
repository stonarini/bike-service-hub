const express = require("express");
const bikeController = require("../controllers/bike");
const { bikeExists } = require("../middleware/exists");
const { validateBike } = require("../middleware/validation");
const router = express.Router();

router.get("/:id", bikeExists);
router.get("/:id", bikeController.findById);

router.post("/new", validateBike.bind({ strict: true }));
router.post("/new", bikeController.create);

router.put("/:id", bikeExists);
router.put("/:id", validateBike.bind({ strict: false }));
router.put("/:id", bikeController.update);

router.delete("/:id", bikeExists);
router.delete("/:id", bikeController.delete);

module.exports = router;
