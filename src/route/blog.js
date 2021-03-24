const { SuccessModal, ErrorModal } = require("../modal/resModal");

const {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const handleBlogRouter = (req, res) => {
  // 专门处理blog路由,也只处理路由  职责分离

  const { path, method, query, body } = req;
  const { id, author, keyword } = query;
  console.log("path", method, path, query, !query, id, body);
  //   list
  if (method === "GET" && path === "/api/blog/list") {
    // if (author && keyword) {
    const result = getList(author, keyword);
    console.log("result", result);
    return result.then((res) => {
      console.log("请求回来后", JSON.parse(JSON.stringify(res)));
      console.log();
      return new SuccessModal(res, "请求成功");
    });
  }

  if (method === "GET" && path === "/api/blog/detail") {
    const data = getDetail(id);
    return new SuccessModal(data, "请求成功");
  }

  // 新增bolg
  if (method === "POST" && path === "/api/blog/addBlog") {
    const data = addBlog(req.body);
    return new SuccessModal(data, "请求成功");
  }

  // 更新bolg
  if (method === "POST" && path === "/api/blog/updateBlog") {
    const data = updateBlog(req.body);
    return new SuccessModal(data, "更新成功");
  }

  // 删除bolg
  if (method === "POST" && path === "/api/blog/delBlog") {
    const res = delBlog(req.body);
    if (!res) {
      return new ErrorModal(res, "删除失败");
    }
    return new SuccessModal(res, "删除成功");
  }
};

module.exports = handleBlogRouter;
