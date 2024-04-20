module.exports = (app) => {
  const user = require("../controllers/user");

  var router = require("express").Router();

  router.post("/:id", user.update);
  console.log(813);
  app.use("/api/private/Modifyinformation", router);
};
