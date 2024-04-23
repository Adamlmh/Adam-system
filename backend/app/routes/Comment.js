module.exports = (app) => {
  const Comment = require("../controllers/Comment");

  var router = require("express").Router();

  // 提交
  router.post("/", Comment.create);
  // 根据会议查询
  router.get("/:id", Comment.getData);
  //更新点赞
  router.post("/updata:id", Comment.update);
  // // 查询会议信息
  // router.get("/getMeetingData/:id", Comment.getMeetingData);

  app.use("/api/private/Comment", router);
};
