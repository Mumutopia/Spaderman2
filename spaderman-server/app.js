require("dotenv").config(); 
var createError = require('http-errors');
var express = require('express');
const session = require("express-session");
const passport = require("passport");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./config/mongo");
require("./config/passport");
const _DEVMODE = false;



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const roomsRouter = require("./routes/rooms")
const leaderboardRouter = require("./routes/leaderboard")
const authRouter = require("./routes/auth.js");

var app = express();
const cors = require("cors");


app.use(
  session({
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_SESSION
  })
);


/**
 * Configuring Cors 
 */
 app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200
  })
);

app.use(passport.initialize());
app.use(passport.session());

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', authRouter)
app.use('/users', usersRouter);
app.use('/play', roomsRouter)
app.use('/leaderboard', leaderboardRouter)


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
