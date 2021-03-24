const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  // let SQL = "select * from blog where 1=1 ";
  // if (author) {
  //   SQL += `author=${author}`;
  // }
  // if (keyword) {
  //   SQL += `keyword=${keyword}`;
  // }
  // const res = exec(SQL);
  // console.log(res);

  return [
    {
      id: 1,
      title: "标题1",
      content: "内容1",
      author: "张涛",
      createTime: "1615992176875",
    },
    {
      id: 2,
      title: "标题2",
      content: "内容2",
      author: "小罗",
      createTime: "1615992211651",
    },
  ];
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
