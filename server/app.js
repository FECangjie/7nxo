'use strict';

var express = require('express');
var timeout = require('connect-timeout');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AV = require('leanengine');

// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

// 设置默认超时时间
app.use(timeout('15s'));

// 加载云引擎中间件
app.use(AV.express());

app.enable('trust proxy');
// 需要重定向到 HTTPS 可去除下一行的注释。
// app.use(AV.Cloud.HttpsRedirect());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function(req, res) {
  res.render('index', { currentTime: new Date() });
});

// 可以将一类的路由单独保存在一个文件中
app.use('/todos', require('./routes/todos'));

// API
const APIS = [
  '/voice/tuijian.json',
  '/voice/play.json',
  '/voice/fenlei_list.json',
  '/voice/rank_list.json'
]
APIS.forEach(o => {
  app.get(o, function(req,res){
    res.status(200)
    var rootPath = process.cwd()
    var simplePath = req.originalUrl.split('?')[0].replace('.json', '')
    var temp = simplePath
    var apiPath = rootPath + '/api' + temp + '.js'
    console.log(apiPath)
    var api = require(apiPath)
    res.send(api(null, req.body || req.query))
    // res.json(questions)
  });
})


app.use(function(req, res, next) {
  // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
  if (/.json/.test(req.originalUrl)) { // api数据
    var err = new Error('Not Found');
    err.status = 404;
    next(err);

  } else if (!res.headersSent) {
    console.log('接到页面' + req.originalUrl + '的请求')
    res.render('index');
  }
});

// error handlers
app.use(function(err, req, res, next) {
  if (req.timedout && req.headers.upgrade === 'websocket') {
    // 忽略 websocket 的超时
    return;
  }

  var statusCode = err.status || 500;
  if (statusCode === 500) {
    console.error(err.stack || err);
  }
  if (req.timedout) {
    console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
  }
  res.status(statusCode);
  // 默认不输出异常详情
  var error = {};
  if (app.get('env') === 'development') {
    // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
    error = err;
  }
  res.render('error', {
    message: err.message,
    error: error
  });
});

module.exports = app;