module.exports = (app) => {
  const Excel = require("../controllers/excel");

  var router = require("express").Router();
  // get得到请求
  router.get("/", Excel.exportMeetingMinutes);

  app.use("/api/excel", router);
};
