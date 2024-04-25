module.exports = (app) => {
  const Feedback = require("../controllers/Feedback");

  var router = require("express").Router();
  //删除delete
  router.get("/delete:id", Feedback.delete);
  //意见更新
  router.post("/updata:id", Feedback.update);
  // // 查询getfeedbackIdData数据
  router.get("/getfeedbackIdData:id", Feedback.getfeedbackIdData);
  // // 查询所有数据
  router.get("/getAllData:id", Feedback.getAllData);
  // 提交
  router.post("/", Feedback.create);

  // 查询
  router.get("/:id", Feedback.getData);

  app.use("/api/private/Feedback", router);
};
