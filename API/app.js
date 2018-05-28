var express = require("express");
var DB = require('./model/db.js');
var ObjectId = require('mongodb').ObjectID;
var Config=require("./model/config.js");

var app = express(); /*实例化使用*/
var fs = require("fs");
// var app = express.Router();

var bodyParser = require('body-parser');
// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/performance/model/result', function (req, res) {
  DB.find("result", {}, function (err, data) {
      if (err) {
        Config.obj = {
          responseCode: "10008",
          responseMsg: err,
          data: null
        }
      } else {
        Config.obj = {
          responseCode: "10001",
          responseMsg: "请求成功！",
          data:data
        }
      }
      res.json(Config.obj);
  })
});

app.post('/performance/model/list', function (req, res) {
    DB.find("list", {}, function (err, data) {
        if (err) {
            Config.obj = {
                responseCode: "10008",
                responseMsg: err,
                data: null
            }
        } else {
            Config.obj = {
                responseCode: "10001",
                responseMsg: "请求成功！",
                data:data
            }
        }
        res.json(Config.obj);
    })
});

app.get('/performance/model/login.do',function (req,res) {

    DB.find("login", {username:req.query.username}, function (err, data) {
        if (err) {
            Config.obj = {
                responseCode: "10008",
                responseMsg: err,
                data: null
            };
        } else {
            if(data.length === 0){
                Config.obj = {
                    responseCode: "10002",
                    responseMsg: "无效用户！",
                    data: false
                }
            }else if(data[0].password !== req.query.password ){
                Config.obj = {
                    responseCode: "10002",
                    responseMsg: "密码错误！",
                    data: false
                }
            }else {
                Config.obj = {
                    responseCode: "10001",
                    responseMsg: "请求成功！",
                    data:data
                }
            }
        }
        res.json(Config.obj);
    })

});

app.post('/performance/model/activity', function (req, res) {

});

app.put('/performance/model/sid', function (req, res) {
    console.log(req.body);
});
app.post('/performance/model/activity1', function (req, res) {
    DB.find("activity", {}, function (err, res1) {
        DB.find("classify", {}, function (err, res2) {
            DB.find("items", {}, function (err, res3) {
                DB.find("list", {}, function (err, res4) {
                    if (err) {
                        Config.obj = {
                            responseCode: "10008",
                            responseMsg: err,
                            data: null
                        };
                    } else {
                        Config.obj = {
                            responseCode: "10001",
                            responseMsg: "请求成功！",
                            data:{
                                res1,
                                res2,
                                res3,
                                res4
                            }
                        };
                    }
                    res.json(Config.obj);
                })
            })
        })
    })
});
app.listen(8081);
console.log('Listening on port "欢迎来到英雄联盟！" 8081···')
