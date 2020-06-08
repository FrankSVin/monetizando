const express = require('express');
let path = require('path');
const cookieParser = require('cookie-parser');
const logger = require("morgan");
const createError = require("http-errors");


const indexRouter = require('./routes/index');
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const lerDados = require('./routes/dados');

const app = express();


app.set('public', path.join(__dirname, 'public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use((req, res, next) => {
  next();
});
app.use('/', indexRouter);
app.use("/login", loginRouter);
app.use('/dados', lerDados);
app.use("/logout", logoutRouter);



app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  return res.status(err.status || 500);
  
});



app.get('/', function(req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)
 
  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
}); 

module.exports = app;