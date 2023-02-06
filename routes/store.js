const express = require("express");
const storeController = require("../controllers/store");
const { validate } = require("../middleware/validation");
const { exists } = require("../middleware/exists");
const router = express.Router();

router.post("/new", validate.bind({ model: "store", strict: true }));
router.post("/new", storeController.create);

router.use("/:id", exists.bind({ model: "store" }));
router.get("/:id", storeController.findById);

router.put("/:id", validate.bind({ model: "store", strict: false }));
router.put("/:id", storeController.update);

router.delete("/:id", storeController.delete);

router.put("/:id/addBike", storeController.addBike);

module.exports = router;
