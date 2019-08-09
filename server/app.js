var createError = require('http-errors');  //提供页面报错
var express = require('express');
var path = require('path');   //处理路径模块
var cookieParser = require('cookie-parser');   //Express的中间件，实现cookie的解析
var logger = require('morgan');    //可以将请求信息打印在控制台
var session = require('express-session') //基于express专门用于处理session的中间件

var app = express();

app.use(session({
  secret: '^&$^%$(&',  //自定义加密属性
  name:'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge:1000*60*60
  }
}))

// app.use('/',function(req,res,next){
//   res.header("Access-Control-Allow-Origin","*");
// res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");  
// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
// next();
// })


var { Mongoose }=require('./untils/config.js');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');




// view engine setup
app.set('views', path.join(__dirname, 'views'));  //设置模板文件夹，规范路径
app.set('view engine', 'ejs');   //设置使用的模版引擎，我们使用的ejs
app.use(logger('dev'));    //可以将请求信息打印在控制台
app.use(express.json());   //支持 JSON, urlencoded和multipart requests的请求体解析中间件。
app.use(express.urlencoded({ extended: false }));  //提供解析urlencoded字符的中间件
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));  //设置静态文件目录

app.use('/', indexRouter);
app.use('/api2/users', usersRouter); 
app.use('/api2/admin',adminRouter);
 //*

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//*
Mongoose.connect();



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//cors
// var cors=require('cors');
// app.use(cors({
//     origin:['http://localhost:3000'],  //指定接收的地址
//     methods:['GET','POST'],  //指定接收的请求类型
//     alloweHeaders:['Content-Type','Authorization']  //指定header
// }))

module.exports = app;
