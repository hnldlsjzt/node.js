/**
 * 根据环境，配置全局参数
 */

const dev = process.env.NODE_ENV;
console.log("dev---", dev);
let MY_SQL;

if (dev === "dev") {
  MY_SQL = {
    host: "localhost",
    username: "root",
    password: "zhangtao123",
    database: "myblog",
  };
}

module.exports = {
  MY_SQL,
};
