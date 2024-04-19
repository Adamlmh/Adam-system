module.exports = (app) => {
  const user = require("../controllers/user");

  var router = require("express").Router();

  router.get("/:id", user.getData);

  app.use("/api/private/Personalcenter", router);
};
