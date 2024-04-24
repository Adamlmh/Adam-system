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
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      personalMinutes: {
        type: DataTypes.STRING(10000),
        defaultValue: "无",
        allowNull: true,
      },
      meetingContent: {
        type: DataTypes.STRING(255),

        allowNull: true,
      },
      meetingPhoto: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      meetingType: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "待审核", // 默认值为0
      },
      reviewComments: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      meetingTime: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tag1: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      tag2: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      tag3: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3, // 默认值为3
      },
      uploaderName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      uploaderGroup: {
        type: DataTypes.STRING(50),
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
