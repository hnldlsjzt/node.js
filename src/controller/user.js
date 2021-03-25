const { exec } = require("../db/mysql");
const register = async ({ userName, password, realname } = {}) => {
  const querySql = `select userName from user where username='${userName}'`;
  const queryRes = await exec(querySql);
  console.log("query", queryRes);
  if (queryRes.length) {
    return new Promise((resolve) => resolve({ message: "该账号已存在" }));
  }
  const SQL = `insert into user(username,password,realname) values('${userName}','${password}','${realname}');`;
  return exec(SQL);
};

const loginCheck = ({ userName, password, realname } = {}) => {
  const SQL = `select username,password from user where username='${userName}' and password='${password}';`;
  return exec(SQL);
};

module.exports = {
  register,
  loginCheck,
};
