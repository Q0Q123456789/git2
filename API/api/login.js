let express = require("express");
let DB = require('../model/db.js');
let config = require('../model/config.js');
let SHA = require("js-sha1");
let ObjectId = require('mongodb').ObjectID;
let fs = require("fs");

let app = express.Router(); /*实例化使用*/
let bodyParser = require('body-parser');
// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// const crypto = require('crypto');
let token,UserName;
let crypto;
try {
    crypto = require('crypto');
} catch (err) {
    console.log('不支持 crypto!');
}
//用户登录
app.login = function (req,res) {
    UserName = req.body.username;
    const secret = req.body.password;
    const password = crypto.createHmac('sha256', secret)
                       .update('I love cupcakes')
                       .digest('hex');
    DB.updateOne('login',{username: req.body.username},{ $set:{loginTime: new Date().toLocaleString() } } ,function (err , tiem){
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
                } else if (data[0].password !== password ) {
                    config.obj = {
                        responseCode: "10008",
                        responseMsg: "密码错误！"
                    }
                } else {
                    config.obj = {
                        responseCode: "10001",
                        responseMsg: "登录成功！",
                        data:{
                            token:SHA(data)
                        }
                    }
                    token = config.obj.data.token;
                }
            }
            res.json(config.obj);
        })
    })
};
//添加用户
app.addName = function (req,res) {
    const secret = req.body.password;
    const password = crypto.createHmac('sha256', secret)
        .update('I love cupcakes')
        .digest('hex');
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
                password:password,
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
};
//获取用户信息
app.findUser = function (req,res) {
    if (req.query.token === token){
        DB.find('login',{username: UserName},function (err,data) {
            config.obj = {
                responseCode: "10001",
                responseMsg: "登录成功！",
                data
            }
            res.json(config.obj);
        })
    }
};
module.exports = app;
console.log('登录-----加载成功！');