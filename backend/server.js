const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const colors = require("colors");
const { exec } = require("child_process");
const { platform } = require("os");
const { validateToken } = require("./app/utils/users");
const http = require("http"); // 导入http模块
const websocket = require("./app/websocket/websocket.js"); // 导入WebSocket模块

// 将静态文件目录设置为 frontend 文件夹
app.use(express.static(path.join(__dirname, "..", "frontend")));
app.use(express.static(path.join(__dirname, "uploads")));
console.log(path.join(__dirname, "uploads"));
console.log(path.join(__dirname, "..", "frontend"));
//解决base64码传输大小限制
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
//解决跨域
app.use(cors());
// 设置跨域和相应数据格式
app.all("/api/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With, token");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (req.method == "OPTIONS") res.send(200);
  /*让options请求快速返回*/ else next();
});

// 中间件 解决json字符串和对象转换
app.use(express.json());

// 解决 URL 编码传输数据
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize
  .sync()
  .then(() => {
    console.log("同步数据库");
  })
  .catch((err) => {
    console.log("同步数据库失败: " + err.message);
  });

// 如果存在则更新(终极摧毁所有数据);
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("更新数据库");
// });

// 简单的路由测试
app.get("/", (req, res) => {
  res.json({ message: "Welcome to adam system." });
});

//中间件验证token 只验证/api/private/* 路径
app.use("/api/private/*", validateToken);
require("./app/routes/excel")(app);
require("./app/routes/Personalcenter")(app);
require("./app/routes/user")(app);
require("./app/routes/Modifyinformation")(app);
require("./app/routes/upload")(app);
require("./app/routes/MeetingMinutes")(app);
require("./app/routes/Feedback")(app);
require("./app/routes/Comment")(app);
require("./app/routes/Favorite")(app);

// 创建HTTP服务器
const server = http.createServer(app);

// 启动WebSocket服务器
websocket(server);

// 启动服务器
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(
    colors.green.bold(`项目启动成功: http://localhost:${PORT}/login/index.html`)
  );
  // 自动打开登录页
  const url = `http://localhost:${PORT}/login/index.html`;

  // 避免系统差异化影响
  const os = platform();

  // 根据操作系统执行不同的命令
  if (os === "win32") {
    // Windows 系统
    exec(`start ${url}`);
  } else if (os === "darwin") {
    // macOS 系统
    exec(`open ${url}`);
  } else {
    // Linux 等其他系统
    exec(`xdg-open ${url}`);
  }
});
