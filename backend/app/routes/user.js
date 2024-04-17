module.exports = app => {
  const user = require("../controllers/user");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/register", user.create);

    // Retrieve all Tutorials
  router.post("/login", user.findOne);
  
  app.use('/api/user', router);
};