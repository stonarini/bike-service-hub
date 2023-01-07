const express = require("express");
const bikeController = require("../controllers/bike")
const router = express.Router();

router.get("/:id", bikeController.findById);

router.post("/new", bikeController.create);

router.put("/:id", bikeController.update);

router.delete("/:id", bikeController.delete);

module.exports = router;
