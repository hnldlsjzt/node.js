const queryString = require("querystring");
// 引入路由
const handleBlogRouter = require("./src/route/blog");
const handleUsersRouter = require("./src/route/users");

//  处理post Data数据
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    const { method } = req;
    // 不是post 直接返回
    if (method !== "POST") {
      return resolve({});
    }

    // 请求类型头不正确 直接返回
    if (req.headers["content-type"] !== "application/json") {
      return resolve({});
    }

    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString(); // 收到的是二进制Buffer,使用toString转成字符串
    });
    req.on("end", () => {
      // 判空
      if (!postData) return resolve({});

      return resolve(JSON.parse(postData)); // 收到的已经是字符串JSON，需要解析
    });
  });
};

const serverHandle = (req, res) => {
  //   res.setHeader("Content-type", "text/plain");
  const { url } = req;
  const [path, query] = url.split("?");
  req.path = path;
  req.query = queryString.parse(query); // 解析query参数，返回格式为对象

  req.cookieStr = req.headers.cookie || ""; // 获取cookic
  req.cookie = {};

  req.cookieStr.split(";").forEach((item) => {
    if (item) {
      const [key, value] = item.split("=");
      req.cookie[key.trim()] = value.trim();
    }
  });
  console.log("cookie", req.cookie);
  getPostData(req).then((postData) => {
    console.log("promise", postData);
    req.body = postData;

    const blogRes = handleBlogRouter(req, res);
    const usersRes = handleUsersRouter(req, res);
    console.log("req", req.body, postData, blogRes, usersRes);

    // 设置响应头
    res.setHeader("Content-type", "application/json");
    // blog相关路由处理
    if (blogRes) {
      blogRes.then((data) => {
        res.end(JSON.stringify(data));
      });
      return; // 异步，防止then还没触发时，走到了404
    }

    //   user相关路由处理
    if (usersRes) {
      usersRes.then((data) => {
        res.end(JSON.stringify(data));
      });
      return;
    }
    // 404相关
    res.writeHead("404", {
      "Content-type": "text/plain",
    });
    res.write("404 Not Found");
    res.end();
  });
};

// 导出
module.exports = serverHandle;
