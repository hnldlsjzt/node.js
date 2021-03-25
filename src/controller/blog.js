const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  let SQL = "select * from blog where 1=1 ";
  if (author) {
    SQL += `and author='${author}' `;
  }
  // if (keyword) {
  //   SQL += `keyword=${keyword}`;
  // }
  SQL += "order by createtime desc;";
  return exec(SQL);
};

// 获取bolg详情
const getDetail = (id) => {
  let SQL = "select * from blog where 1=1 ";
  if (id) {
    SQL += `and id='${id}';`;
  }
  return exec(SQL);
};

// 新增博客
const addBlog = ({ title, content, author } = {}) => {
  const createtime = Date.now();
  let SQL = `insert into blog(title,content,author,createtime) values('${title}','${content}','${author}','${createtime}');`;
  return exec(SQL);
};

// 更新博客
const updateBlog = ({ id, title, content, author } = {}) => {
  const updatatime = Date.now();
  const SQL = `update blog set title='${title}',content='${content}',author='${author}',updatetime='${updatatime}' where id=${id};`;
  console.log(SQL);
  return exec(SQL);
};

// 删除博客
const delBlog = ({ id } = {}) => {
  const SQL = `delete from blog where id=${id}`;
  return exec(SQL);
};
// 返回
module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog,
};
