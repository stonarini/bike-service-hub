var express = require("express");
var logger = require("morgan");
var { initDB } = require("./database/database");

var bikesRouter = require("./routes/bikes");
var bikeRouter = require("./routes/bike");

var app = express();

initDB().then(DB => {
	app.locals.DB = DB.db("bikes").collection("catalog");
	app.locals.DBclient = DB;
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/bikes", bikesRouter);
app.use("/bike", bikeRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
	res.status(404).json();
});

module.exports = app;
