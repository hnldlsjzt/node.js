// 这里专门处理http服务
const http = require("http");
const port = 8000;

// 引入处理请求的函数
const serverHandle = require("../app");
const server = http.createServer(serverHandle);
server.listen(port);
console.log("blok1 ok", process.env.NODE_ENV);
