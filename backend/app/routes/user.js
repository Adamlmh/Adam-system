module.exports = (app) => {
  const user = require("../controllers/user");

  var router = require("express").Router();

  // 注册路由
  router.post("/register", user.create);

  // 登录路由
  router.post("/login", user.findOne);

  app.use("/api", router);
};
