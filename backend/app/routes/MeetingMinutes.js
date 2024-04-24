module.exports = (app) => {
  const MeetingMinutes = require("../controllers/MeetingMinutes");

  var router = require("express").Router();
  //删除delete
  router.get("/delete:id", MeetingMinutes.delete);
  // // 查询所有数据
  router.get("/getAllData:id", MeetingMinutes.getAllData);
  // 提交
  router.post("/", MeetingMinutes.create);
  // 获取最近五条信息
  router.get("/getFiveData:id", MeetingMinutes.getFiveData);
  // // 查询
  router.get("/:id", MeetingMinutes.getData);
  //更新
  router.post("/updata:id", MeetingMinutes.update);
  // // 查询会议信息
  router.get("/getMeetingData/:id", MeetingMinutes.getMeetingData);

  app.use("/api/private/MeetingMinutes", router);
};
