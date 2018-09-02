let express = require("express");
let DB = require('./model/db.js');
let config = require('./model/config.js');
// const log4js = require('log4js');
// log4js.configure({
//     appenders: { cheese: { type: 'file', filename: 'logs/cheese.log' }},
//     categories: { default: { appenders: ['cheese'], level:'error'}}
// });

// let LogFile = log4js.getLogger('cheese');
// LogFile.trace('This is a Log4js-Test');
// LogFile.debug('We Write Logs with log4js');
// LogFile.info('You can find logs-files in the log-dir');
// LogFile.warn('log-dir is a configuration-item in the log4js.json');
// LogFile.error('In This Test log-dir is : \'./logs/log_test/\'');

let ObjectId = require('mongodb').ObjectID;
let multiparty = require('multiparty');
// let cookie = require('cookie-parser');

let app = express(); /*实例化使用*/
let fs = require("fs");
let SHA = require("js-sha1");

// let Mongodb = require('./model/Mongodb.js');
// let DB = new Mongodb({
//     library:'list'
// });

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/upload",express.static("upload"));

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Cookie", '');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, MUserAgent, MToken, UID, set-cookie,x-access-token,X-URL-PATH");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next()
});
//仓库
let api  = require('./api/server.js');
app.post('/performance/model/warehousing.do',api.warehousing);
app.post('/performance/model/find.do',api.find);

//登录
let login  = require('./api/login.js');
app.post('/performance/model/login.do',login.login);
app.post('/performance/model/addName.do',login.addName);
app.get('/performance/model/findUser.do',login.findUser);

//上传图片
let upload  = require('./api/upload.js');
app.post('/performance/model/upload.do',upload.upload);

//查询
let query  = require('./api/query.js');
app.post('/performance/model/query.do',query.query);
app.get('/performance/model/images.do',query.images);

app.get("/a", function(request, response){
    response.send("hello!");
});
app.listen(8030);
console.log('Listening on port 8030······');