const loginCheck = (content = {}) => {
  const { userName, password } = content;
  console.log(userName, password);
  if (userName === "admin" && password == "123") {
    return true;
  }
  return false;
};

module.exports = {
  loginCheck,
};
