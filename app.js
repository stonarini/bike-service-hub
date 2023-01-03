var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var { initDB } = require('./database/database')

var bikesRouter = require('./routes/bikes');


var app = express();

initDB().then((DB) => {
  app.locals.DB = DB
  console.log(DB)
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/bike', bikesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});


module.exports = app;