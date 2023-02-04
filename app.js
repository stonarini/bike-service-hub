require("dotenv").config();
const express = require("express");
const { initDB } = require("./db/database");

const bikesRouter = require("./routes/bikes");
const bikeRouter = require("./routes/bike");
const storesRouter = require("./routes/stores");

const app = express();

initDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/bikes", bikesRouter);
app.use("/bike", bikeRouter);
app.use("/stores", storesRouter);

app.use(function (req, res) {
	res.status(404).json({ error: "not found" });
});

module.exports = app;
