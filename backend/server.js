const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
const colors = require('colors');
const { exec } = require('child_process');
const { platform } = require('os');
// 将静态文件目录设置为 frontend 文件夹
app.use(express.static(path.join(__dirname,'..', 'frontend')));
console.log(path.join(__dirname, 'frontend'));

// 定义一个路由来处理访问根路径的请求
app.get('/', (req, res) => {
  // 当用户访问根路径时，发送 index.html 文件
  res.sendFile(path.join(__dirname, '..','frontend','login', 'index.html'));
});
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// require("./app/routes/turorial.routes")(app);
require("./app/routes/user")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(colors.green.bold(`项目启动成功: http://localhost:${PORT}/login/index.html`));
// 自动打开登录页 
const url = `http://localhost:${PORT}/login/index.html`;

// 避免系统差异化影响
const os = platform();

// 根据操作系统执行不同的命令
if (os === 'win32') {
  // Windows 系统
  exec(`start ${url}`);
} else if (os === 'darwin') {
  // macOS 系统
  exec(`open ${url}`);
} else {
  // Linux 等其他系统
  exec(`xdg-open ${url}`);
}
});
