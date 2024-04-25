// models/MeetingMinutes.js
module.exports = (sequelize, DataTypes) => {
  const MeetingMinutes = sequelize.define(
    "MeetingMinutes",
    {
      minutesId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uploaderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      meetingTopic: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      personalMinutes: {
        type: DataTypes.STRING(5000),
        defaultValue: "无",
        allowNull: true,
      },
      meetingContent: {
        type: DataTypes.STRING(5000),
        allowNull: true,
      },
      meetingPhoto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      meetingType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "待审核", // 默认值为0
      },
      reviewComments: {
        type: DataTypes.STRING(3000),
        allowNull: true,
      },
      meetingTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tag1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tag2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tag3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3, // 默认值为3
      },
      uploaderName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      uploaderGroup: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      timezone: "+08:00",
    }
  );

  return MeetingMinutes;
};
