// models/User.js
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    usertype: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: true // 启用自动生成的时间戳列
  });

  return User;
};
