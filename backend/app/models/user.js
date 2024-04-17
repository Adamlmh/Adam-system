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
      allowNull: true 
    },
    usertype: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.BLOB, // 存储头像的二进制数据
      allowNull: true
    }
  }, {
    timestamps: true, // 启用自动生成的时间戳列
    timezone: '+08:00' // 设置时区为东八区
  });

  return User;
};
