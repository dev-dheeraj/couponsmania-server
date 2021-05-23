var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mysql = require("mysql");
var http = require("http");
require("dotenv").config();

var couponRouter = require("./server/routes/coupon");
// var couponRouter = require("./server/routes/demoCoupon"); // for demo

var app = express();
//  mysql db connection
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("enctype", "multipart/form-data");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization "
  );
  // res.header('Content-Type', 'multipart/form-data');

  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'upload')));

app.use("/", couponRouter);
app.use("/api/coupon", couponRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message : 'something went wrong', error : err});
});
app.listen(process.env.PORT || 8000, () => console.log(`Server has started at ${process.env.PORT}`));

module.exports = app;
