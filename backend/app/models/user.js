// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true, // 允许为空
        defaultValue: "请先到修改信息处完成首次个人信息提交噢",
      },
      group: {
        type: DataTypes.STRING,
        allowNull: true, // 允许为空
      },
      usertype: {
        type: DataTypes.STRING,
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: true, // 允许为空
      },
      major: {
        type: DataTypes.STRING,
        allowNull: true, // 允许为空
      },
      introduction: {
        type: DataTypes.STRING(1500),
        allowNull: true, // 允许为空
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true, // 允许为空
      },
      avatar: {
        type: DataTypes.STRING(1000), // 存储头像
        allowNull: true, // 允许为空
        defaultValue: "../../images/avatar_gril.jpg",
      },
    },
    {
      timestamps: true, // 启用自动生成的时间戳列
      timezone: "+08:00", // 设置时区为东八区
    }
  );

  return User;
};
