module.exports = (app) => {
  const Feedback = require("../controllers/Feedback");

  var router = require("express").Router();
  // // 查询所有数据
  router.get("/getAllData:id", Feedback.getAllData);
  // 提交
  router.post("/", Feedback.create);

  // 查询
  router.get("/:id", Feedback.getData);

  app.use("/api/private/Feedback", router);
};
