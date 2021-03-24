/**
 * 根据环境，配置全局参数
 */

const dev = process.env.NODE_ENV;
console.log("dev---", dev);
let MY_SQL;

if (dev === "dev") {
  MY_SQL = {
    host: "localhost",
    user: "root",
    password: "test",
    database: "myblog",
    port: 3306,
  };
}

module.exports = {
  MY_SQL,
};
