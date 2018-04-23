var express = require("express");
var DB = require('./model/db.js');
var ObjectId = require('mongodb').ObjectID;

var app = express(); /*实例化使用*/
var fs = require("fs");

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/performance/model/list', function (req, res) {
    // fs.readFile( __dirname + "/" + "list.json", 'utf8', function (err, data) {
    //     // console.log( data );
    //     res.jsonp( data );
    // });
    DB.find("username", {}, function (err, data) {
        DB.find("list", {}, function (err, list) {
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
                    data: {
                        data,
                        list
                    }
                }
            }
            res.json(obj);
        })
    })

})
// app.post('/performance/model/list', function (req, res) {
//   DB.find("username", {}, function (err, data) {
//     DB.find("list", {}, function (err, list) {
//       if (err) {
//         var obj = {
//           responseCode: "10008",
//           responseMsg: err,
//           data: null
//         }
//       } else {
//         var obj = {
//           responseCode: "10001",
//           responseMsg: "请求成功！",
//           responsedata: {
//             data,
//             list
//           }
//         }
//       }
//       res.json(obj);
//     })
//   })
// })
app.post('/performance/model/local', function (req, res) {
    DB.find("startup_log", {}, function (err, data) {
        // DB.find("list", {}, function (err, list) {
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
                responseMsg: "请求成功！",
                data: {
                    data
                }
            }
        }
        res.json(obj);
        // })
    })
})
app.post('/performance/model/list', function (req, res) {
    DB.find("list", {}, function (err, data) {
        // DB.find("list", {}, function (err, list) {
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
            }
        }
        res.json(obj);
    })
})

app.listen(8081);
console.log('Listening on port 8081...')
