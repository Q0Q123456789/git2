var express = require("express");
var DB = require('./model/db.js');
var ObjectId = require('mongodb').ObjectID;

const crypto = require('crypto');
const secret = 'abcdefg';

const hash = crypto.createHmac('sha256', secret)
    .update('qwe')
    .digest('hex');
console.log(hash);



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


app.listen(8081);
console.log('Listening on port 8081...')
