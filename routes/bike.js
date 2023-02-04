const express = require("express");
const bikeController = require("../controllers/bike");
const { bikeExists } = require("../middleware/exists");
const { validate } = require("../middleware/validation");
const router = express.Router();

router.post("/new", validate.bind({ model: "bike", strict: true }));
router.post("/new", bikeController.create);

router.use("/:id", bikeExists);
router.get("/:id", bikeController.findById);

router.put("/:id", validate.bind({ model: "bike", strict: false }));
router.put("/:id", bikeController.update);

router.delete("/:id", bikeController.delete);

module.exports = router;
