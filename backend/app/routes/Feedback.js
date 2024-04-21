module.exports = (app) => {
  const Feedback = require("../controllers/Feedback");

  var router = require("express").Router();

  // 提交
  router.post("/", Feedback.create);

  // 查询
  router.get("/:id", Feedback.getData);

  app.use("/api/private/Feedback", router);
};
