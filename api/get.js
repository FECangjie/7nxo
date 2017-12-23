var express = require('express')
var fs = require('fs');
var path = require('path');

var router = require('express').Router()
var APIS = require('./apiType.js')

router.get(APIS.GET_TUIJIAN.url, function(req, res){
  console.log('接到接口请求：' + APIS.GET_TUIJIAN.url)
  var hostName = req.hostname;
  console.log("hostName: %s", hostName);
  res.status(200)
  var rootPath = process.cwd()
  var simplePath = req.originalUrl.split('?')[0].replace('.json', '')
  var temp = simplePath
  console.log(temp)
  var apiPath = rootPath + '/sql' + temp + '.json'
  fs.readFile(apiPath, {flag: 'r+', encoding: 'utf8'}, function(err, data){
    if (err) {
      res.send({err: 0})
      console.log(err);
    } else {
      res.send(data)
    }
  });
});


router.get(APIS.LOGIN.url, function(req, res){
  console.log('接到接口请求：' + APIS.GET_TUIJIAN.url)
  var hostName = req.hostname;
  console.log("hostName: %s", hostName);
  res.status(200)
  var rootPath = process.cwd()
  var simplePath = req.originalUrl.split('?')[0].replace('.json', '')
  var temp = simplePath
  console.log(temp)
  var apiPath = rootPath + '/sql' + temp + '.json'
  fs.readFile(apiPath, {flag: 'r+', encoding: 'utf8'}, function(err, data){
    if (err) {
      res.send({err: 0})
      console.log(err);
    } else {
      var obj = JSON.parse(data)
      ++ obj.data.count
      var str = JSON.stringify(obj)

      fs.writeFile(apiPath, str, {}, function (err) {
       if(err) {
        console.error(err);
        } else {
           console.log('写入成功');
        }
      });
      res.send(data)
    }
  });
});

router.get(APIS.GET_PLAY.url, function(req, res){
  fs.readFile(path.join(__dirname, '../sql/voice/tuijian.json'), {flag: 'r+', encoding: 'utf8'}, function(err, data){
    if (err) {
      console.log(err);
    } else {
      var obj = JSON.parse(data)
      ++ obj.guest_list[0].click_count
      var str = JSON.stringify(obj)
      fs.writeFile(path.join(__dirname, '../sql/voice/tuijian.json'), str, {}, function (err) {
       if(err) {
        console.error(err);
        } else {
           console.log('写入成功');
        }
      });
    }
  });

  var hostName = req.hostname;
  console.log("hostName: %s", hostName);
  res.status(200)
  var rootPath = process.cwd()
  var simplePath = req.originalUrl.split('?')[0].replace('.json', '')
  var temp = simplePath
  var apiPath = rootPath + '/sql' + temp + '.js'
  var api = require(apiPath)
  res.send(api(null, req.body || req.query))
  // res.json(questions)
});

router.get(APIS.INFO.url, function(req, res){
  var hostName = req.hostname;
  console.log("hostName: %s", hostName);
  res.status(200)
  var rootPath = process.cwd()
  var simplePath = req.originalUrl.split('?')[0].replace('.json', '')
  var apiPath = rootPath + '/sql' + simplePath + '.json'
  fs.readFile(apiPath, {flag: 'r+', encoding: 'utf8'}, function(err, data){
    if (err) {
      res.send({err: 0})
      console.log(err);
    } else {
      console.log(data);
      res.send(data)
    }
  });
});

router.get(APIS.GET_RANK.url, function(req, res){
  var hostName = req.hostname;
  console.log("hostName: %s", hostName);
  res.status(200)
  var rootPath = process.cwd()
  var simplePath = req.originalUrl.split('?')[0].replace('.json', '')
  var temp = simplePath
  var apiPath = rootPath + '/sql' + temp + '.js'
  var api = require(apiPath)
  res.send(api(null, req.body || req.query))
  // res.json(questions)
});

module.exports = router
