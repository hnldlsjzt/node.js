/**
 * mysql 连接的相关配置
 */

const mysql = require("mysql");
const { MY_SQL } = require("../conf/db");

const con = mysql.createConnection(MY_SQL); // 创建mysql连接

// 连接数据库
con.connect();

// 封装执行sql语句

function exec(sql) {
  // 返回promise
  return new Promise((resolve, reject) => {
    con.query(sql, function (err, res) {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
}

module.exports = {
  exec,
};
