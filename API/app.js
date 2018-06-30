let express = require("express");
let DB = require('./model/db.js');
let config = require('./model/config.js');
let ObjectId = require('mongodb').ObjectID;
let multiparty = require('multiparty');
let cookie = require('cookie-parser');

let app = express(); /*实例化使用*/
let fs = require("fs");
let SHA = require("js-sha1");
// var router = express.Router();

let bodyParser = require('body-parser');
// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/upload",express.static("upload"));
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Cookie", '');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, MUserAgent, MToken, UID, set-cookie");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
//上传图片w
app.post('/performance/model/upload.do', function (req, res) {
    let form = new multiparty.Form();
    form.uploadDir = 'upload'; /*上传的目录*/
    form.parse(req, function (err, fields, files) {
        let param = {
            name:files.file[0].originalFilename,
            path:files.file[0].path,
            headers:files.file[0].headers,
            size:files.file[0].size,
            uploadTime:new Date().toLocaleString()
        };
        DB.insertOne('images',param,function (err,data) {
            if(err){
                config.obj = {
                    responseCode: "10008",
                    responseMsg: err,
                    data: null
                }
            }else {
                config.obj = {
                    responseCode: "10001",
                    responseMsg: "上传成功！",
                    data
                }
            }
            res.json(config.obj);
        })
    })
});
app.get('/performance/model/list.do', function (req, res) {
    console.log(req.headers);
    console.log(res.headers);
    DB.find("images", {}, function (err, data) {
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
});
//登录
app.post('/performance/model/login.do', function (req, res) {
  DB.updateOne('login',{username: req.body.username},{ $set:{loginTime: new Date().toLocaleString() } } ,function (err , tiem){
    console.log("文档更新成功");
    DB.find("login", {username: req.body.username}, function (err, data) {

        if (err) {
          config.obj = {
              responseCode: "10008",
              responseMsg: err
          }
        } else {
          if (data.length === 0) {
            config.obj = {
                responseCode: "10008",
                responseMsg: "无效用户名！"
            }
          } else if (data[0].password !== req.body.password ) {
            config.obj = {
                responseCode: "10008",
                responseMsg: "密码错误！"
            }
          } else {
            config.obj = {
                responseCode: "10001",
                responseMsg: "登录成功！",
                data
            }
          }
        }
        res.json(config.obj);
    })
  })
});
//添加用户
app.post('/performance/model/addName.do',function ( req, res ) {

  DB.find('login',{username: req.body.username}, function(err,data) {
    if(err){
      config.obj = {
          responseCode: "10008",
          responseMsg: err
      }
    } else if( data[0].username === req.body.username ){
      config.obj = {
          responseCode: "10008",
          responseMsg: "账号已存在！"
      }
    } else if ( data[0].username !== req.body.username ) {
      let params = {
        username:req.body.username,
        password:req.body.password,
        addTime:new Date().toLocaleString(),
        loginTime:'',
        falseOne:true,
        weight:'1',
        sex:'M'
      };
      DB.insertOne('login',params,function ( err,data ) {
        if(err) {
          config.obj = {
              responseCode: "10008",
              responseMsg: "添加失败！"
          }
        }else if (true) {
          config.obj = {
              responseCode: "10001",
              responseMsg: "添加成功！",
              data
          }
        }
      })
    }
    res.json(config.obj);
  })

});

//查询
app.post('/performance/model/query.do',function (req,res) {
    // let uploadTime = req.body.uploadTime;
    let name = req.body.name;
    let icon_url = req.body.icon_url;
    DB.find('menu',{'icon_url':{$regex:icon_url},'name':{$regex:name}},function (err,data) {
        if(err){
            config.obj = {
                responseCode: "10008",
                responseMsg: "添加失败！"
            }
        }else {
            config.obj = {
                responseCode: "10001",
                responseMsg: "添加成功！",
                data
            }
        }
        res.json(config.obj);
    })
});

app.listen(3000);
console.log('Listening on port 3000...');