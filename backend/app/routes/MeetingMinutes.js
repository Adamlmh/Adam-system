module.exports = (app) => {
  const MeetingMinutes = require("../controllers/MeetingMinutes");

  var router = require("express").Router();

  // 提交
  router.post("/", MeetingMinutes.create);

  // 查询
  router.get("/:id", MeetingMinutes.getData);

  app.use("/api/private/MeetingMinutes", router);
};
