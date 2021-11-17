require("dotenv").config(); 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./config/mongo");



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const roomsRouter = require("./routes/rooms")

var app = express();
const cors = require("cors");


/**
 * Configuring Cors 
 */
 app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);


// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/play', roomsRouter)

//const socketServer = require("./socket")(app);
// console.log(socketServer)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // send the error messages
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
