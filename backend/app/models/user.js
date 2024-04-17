// models/User.js
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true // 允许为空
    },
    group: {
      type: Sequelize.STRING,
      allowNull: true // 允许为空
    },
    usertype: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: true // 启用自动生成的时间戳列
  });

  return User;
};

