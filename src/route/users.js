const { loginCheck } = require("../controller/user");
const { SuccessModal, ErrorModal } = require("../modal/resModal");
const handleUsersRouter = (req, res) => {
  const { method, path, body } = req;
  if (method === "POST" && path === "/api/user/login") {
    const res = loginCheck(body);
    console.log('res',res);
    if (!res) {
      return new ErrorModal({}, "登录失败");
    }
    return new SuccessModal({}, "登录成功");
  }
};

module.exports = handleUsersRouter;
