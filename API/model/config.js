/**
 * Created by Administrator on 2017/5/12 0012.
 */
//配置文件

//数据库地址
// var DbUrl='mongodb://localhost:27017/ceramic';   /*操作的数据库*/
// var DbUrl='mongodb://localhost:27017/list';
var DbUrl='mongodb://localhost:27017/config';
// var DbUrl='mongodb://localhost:27017/local';

var obj = {};

// exports.DbUrl=DbUrl;
// exports.obj = obj;
module.exports={
    DbUrl,
    obj
}
