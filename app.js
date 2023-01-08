const express = require("express");
const logger = require("morgan");
const { initDB } = require("./database/database");
const initRepository = require("./repository/repository");

const bikesRouter = require("./routes/bikes");
const bikeRouter = require("./routes/bike");

const app = express();

initDB().then(DB => {
	app.locals.DB = initRepository(DB.db(process.env.TEST ? "test-bikes" : "bikes").collection("catalog"));
	app.locals.DBclient = DB;
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/bikes", bikesRouter);
app.use("/bike", bikeRouter);

app.use(function (req, res) {
	res.status(404).json({ error: "not found" });
});

module.exports = app;
