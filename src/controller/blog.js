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
  return {
    id: 1,
    title: "详情1",
    content: "详情1",
    author: "张涛",
    createTime: "1615992176875",
  };
};

// 新增博客
const addBlog = (id, content = {}) => {
  return {
    id: 3,
  };
};

// 更新博客
const updateBlog = (blogData = {}) => {
  return {
    id: 3,
  };
};

// 删除博客
const delBlog = (blogData = {}) => {
  const { id } = blogData;
  console.log("id", id);
  if (id === 3) {
    return true;
  }
  return false;
};
// 返回
module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog,
};
