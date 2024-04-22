module.exports = (app) => {
  const MeetingMinutes = require("../controllers/MeetingMinutes");

  var router = require("express").Router();

  // 提交
  router.post("/", MeetingMinutes.create);
  // 获取最近五条信息
  router.get("/getFiveData:id", MeetingMinutes.getFiveData);
  // // 查询
  router.get("/:id", MeetingMinutes.getData);

  app.use("/api/private/MeetingMinutes", router);
};
