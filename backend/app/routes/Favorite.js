module.exports = (app) => {
  const Favorite = require("../controllers/Favorite");

  var router = require("express").Router();
  //删除delete
  router.get("/delete/:minutesId/:userId", Favorite.delete);
  // 提交
  router.post("/", Favorite.create);
  // 根据会议查询
  router.get("/:minutesId/:userId", Favorite.getData);

  app.use("/api/private/Favorite", router);
};
