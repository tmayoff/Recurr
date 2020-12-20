require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport')
var sequelize = require('./services/sequelize');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var apiRouter = require('./routes/api');
var userRouter = require('./routes/user');

var app = express();

// Setup session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}));
app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

// Locals
app.locals.moment = require('moment');

app.use('/', indexRouter);
app.use('/authentication', authRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);

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
  res.render('error');
});

module.exports = app;
