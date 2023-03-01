var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require("mongoose")
var mongoConfig=require("./config/mongoConfig")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
mongoose.connect(mongoConfig.uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log("DB connected");
}).catch(err=>{
  console.log(err);
})
var server=http.createServer(app)
server.listen(3000,()=>{
  console.log("server strated");
})
const socket=http.createServer(app);
var io=require("socket.io")(server);

io.on("connection",(Socket)=>{
  console.log("User connected");
  Socket.emit("msg","A new user is connected");
  Socket.on("msg",(data)=>
  {io.emit("msg",data)
   addChat(data)

});
});
module.exports = app;
