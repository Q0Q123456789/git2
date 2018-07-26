let express = require("express");
let DB = require('../model/db.js');
let config = require('../model/config.js');

const log4js = require('log4js');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'logs/cheese.log' }},
    categories: { default: { appenders: ['cheese'], level:'error'}}
});

let LogFile = log4js.getLogger('cheese');
let ObjectId = require('mongodb').ObjectID;

let app = express.Router(); /*实例化使用*/
let fs = require("fs");

let bodyParser = require('body-parser');
// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.warehousing = function (req, res) {
    let params = {
        name:req.body.name,
        model:req.body.model,
        colorNumber:req.body.colorNumber,
        number:req.body.number,
        flieName:req.body.flieName,
        flieUrl:req.body.flieUrl,
        addTime:new Date().toLocaleString(),
        loginTime:'',
        Specifications:req.body.Specifications,
        type:req.body.type
    };
    DB.insertOne("warehousing", params, function (err, data) {
        if (err) {
            config.obj = {
                responseCode: "10008",
                responseMsg: err,
                data: null
            }
        } else {
            config.obj = {
                responseCode: "10001",
                responseMsg: "请求成功！",
                data
            }
        }
        res.json(config.obj);
    })
}
//详情
app.find = function(req,res){
    DB.find("warehousing", {}, function (err, data) {
        if (err) {
            config.obj = {
                responseCode: "10008",
                responseMsg: err,
                data: null
            }
        } else {
            config.obj = {
                responseCode: "10001",
                responseMsg: "请求成功！",
                data
            }
        }
        res.json(config.obj);
    })
}

module.exports = app;
console.log('仓库-----加载成功');

