const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./server/data.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// 自定义 CORS 规则，只允许 http://localhost:3000
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // 只允许 localhost:3000 访问
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // 允许前端带 cookies
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// 使用 JSON Server 路由
server.use(router);

// 监听端口
server.listen(8888, () => {
  console.log("JSON Server is running on port 8888");
});
