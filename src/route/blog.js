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
  if (method === "GET" && path === "/api/blog/list") {
    const result = getList(author, keyword);
    return result.then((res) => {
      return new SuccessModal(res, "请求成功");
    });
  }

  if (method === "GET" && path === "/api/blog/detail") {
    if (!id) {
      return new Promise((resolve) =>
        resolve(new ErrorModal({}, "id为必填参数"))
      );
    }
    const result = getDetail(id);
    return result.then((res) => {
      return new SuccessModal(res, "请求成功");
    });
  }

  // 新增bolg
  if (method === "POST" && path === "/api/blog/addBlog") {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return new Promise((resolve) => resolve(new ErrorModal({}, "参数异常")));
    }
    const data = addBlog(req.body);
    return data.then((res) => {
      const { insertId } = res;
      if (insertId) {
        return new SuccessModal({ id: res.insertId }, "新增成功");
      }
      return new ErrorModal({}, "新增失败");
    });
  }

  // 更新bolg
  if (method === "POST" && path === "/api/blog/updateBlog") {
    const { id, title, content, author } = req.body;
    if (!id || !title || !content || !author) {
      return new Promise((resolve) => resolve(new ErrorModal({}, "参数异常")));
    }
    const data = updateBlog(req.body);
    return data.then((res) => {
      const { affectedRows } = res;
      if (affectedRows) {
        return new SuccessModal(res, "更新成功");
      }
      return new ErrorModal({}, "更新失败"); //防止未知的id更新失败
    });
  }

  // 删除bolg
  if (method === "POST" && path === "/api/blog/delBlog") {
    const { id } = req.body;
    if (!id) {
      return new Promise((resolve) => resolve(new ErrorModal({}, "请传入id")));
    }
    const data = delBlog(req.body);
    return data.then((res) => {
      const { affectedRows } = res;
      if (affectedRows) {
        return new SuccessModal(res, "删除成功");
      }
      return new ErrorModal({}, "删除失败"); //防止未知的id删除失败
    });
  }
};

module.exports = handleBlogRouter;
