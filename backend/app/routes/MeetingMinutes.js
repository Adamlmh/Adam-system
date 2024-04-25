module.exports = (app) => {
  const MeetingMinutes = require("../controllers/MeetingMinutes");

  var router = require("express").Router();
  // 查询数据  用户展示全部已通过审核的会议内容
  router.get("/getLatestMeetingData/:id", MeetingMinutes.getLatestMeetingData);
  //删除delete
  router.get("/delete:id", MeetingMinutes.delete);
  // // 查询所有数据
  router.get("/getAllData:id", MeetingMinutes.getAllData);
  // 提交
  router.post("/", MeetingMinutes.create);
  // 获取最近五条信息
  // router.get("/getFiveData:id", MeetingMinutes.getFiveData);
  // // 查询指定用户信息
  router.get("/:id", MeetingMinutes.getData);
  //更新
  router.post("/updata:id", MeetingMinutes.update);
  // // 查询会议信息
  router.get("/getMeetingData/:id", MeetingMinutes.getMeetingData);

  app.use("/api/private/MeetingMinutes", router);
};
