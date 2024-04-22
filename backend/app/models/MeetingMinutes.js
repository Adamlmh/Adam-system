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
      uploaderName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      uploaderGroup: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      meetingTopic: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      personalMinutes: {
        type: DataTypes.STRING(10000),
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
    },
    {
      timestamps: true,
      timezone: "+08:00",
    }
  );

  return MeetingMinutes;
};
