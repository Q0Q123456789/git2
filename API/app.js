var express = require("express");
var DB = require('./model/db.js');
var ObjectId = require('mongodb').ObjectID;

var app = express(); /*实例化使用*/
var fs = require("fs");
// var router = express.Router();

var bodyParser = require('body-parser');
// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/performance/model/result', function (req, res) {
  DB.find("result", {}, function (err, data) {
    // DB.find("local.startup_log ", {}, function (err, list) {
      if (err) {
        var obj = {
          responseCode: "10008",
          responseMsg: err,
          data: null
        }
      } else {
        var obj = {
          responseCode: "10001",
          responseMsg: "请求成功！",
          data
            // list
        }
      }
      res.json(obj);

    // })
  })
})

app.post('/performance/model/list', function (req, res) {

    DB.find("list", {}, function (err, data) {
        // DB.find("local.startup_log ", {}, function (err, list) {
        if (err) {
            var obj = {
                responseCode: "10008",
                responseMsg: err,
                data: null
            }
        } else {
            var obj = {
                responseCode: "10001",
                responseMsg: "请求成功！",
                data
                // list
            }
        }
        res.json(obj);

        // })
    })
})

app.post('/performance/model/activity', function (req, res) {

    DB.find("activity", {}, function (err, data) {
        // DB.find("local.startup_log ", {}, function (err, list) {
        if (err) {
            var obj = {
                responseCode: "10008",
                responseMsg: err,
                data: null
            }
        } else {
            var obj = {
                responseCode: "10001",
                responseMsg: "请求成功！",
                data
                // list
            }
        }
        res.json(obj);

        // })
    })
})

app.put('/performance/model/sid', function (req, res) {
    console.log(req.body);
    // console.log(res.body);
    // DB.updateMany("sid", {}, function (err, data) {
    //     console.log(err);
    //     console.log(data);
    // })
})
app.post('/performance/model/activity1', function (req, res) {
    DB.find("activity", {}, function (err, res1) {
        DB.find("classify", {}, function (err, res2) {
            DB.find("items", {}, function (err, res3) {
                DB.find("list", {}, function (err, res4) {
                    if (err) {
                        var obj = {
                            responseCode: "10008",
                            responseMsg: err,
                            data: null
                        }
                    } else {
                        var obj = {
                            responseCode: "10001",
                            responseMsg: "请求成功！",
                            data:{
                                res1,
                                res2,
                                res3,
                                res4
                            }
                        }
                    }
                    res.json(obj);
                })
            })
        })
    })
})
app.listen(8081);
console.log('Listening on port 8081...')
