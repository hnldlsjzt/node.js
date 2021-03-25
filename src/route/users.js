const { loginCheck, register } = require("../controller/user");
const { SuccessModal, ErrorModal } = require("../modal/resModal");
const handleUsersRouter = (req, res) => {
  const { method, path, body } = req;
  console.log("user router", path);
  if (method === "POST" && path === "/api/user/login") {
    const data = loginCheck(body);
    return data.then((res) => {
      console.log(res);
      if (res.length) {
        return new SuccessModal({}, "登录成功");
      }
      return new ErrorModal({}, "登录失败");
    });
  }

  if (method === "POST" && path === "/api/user/register") {
    const { userName, password, realname } = body;
    if (!userName || !password || !realname) {
      return new Promise((resolve) => resolve(new ErrorModal({}, "参数异常")));
    }
    const data = register(body);
    return data.then((res) => {
      console.log("register", res);
      const { insertId } = res;
      if (insertId) {
        return new SuccessModal({}, "注册成功");
      }
      return new ErrorModal({}, res.message || "注册失败");
    });
  }
};

module.exports = handleUsersRouter;
