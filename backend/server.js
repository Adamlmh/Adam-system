const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const colors = require("colors");
const { exec } = require("child_process");
const { platform } = require("os");
const { validateToken } = require("./app/utils/users");
// 将静态文件目录设置为 frontend 文件夹
app.use(express.static(path.join(__dirname, "..", "frontend")));
console.log(path.join(__dirname, "frontend"));

//解决跨域
app.use(cors());

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

// 如果存在则更新  (终极摧毁所有数据)
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("更新数据库");
// });

// 简单的路由测试
app.get("/", (req, res) => {
  res.json({ message: "Welcome to adam system." });
});

//中间件验证token 只验证/api/private/* 路径
app.use("/api/private/*", validateToken);

require("./app/routes/Personalcenter")(app);
require("./app/routes/user")(app);
// 启动服务器
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
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
