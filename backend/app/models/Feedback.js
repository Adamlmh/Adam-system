// models/Feedback.js
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    "Feedback",
    {
      feedbackId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      submitterId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      feedbackSubject: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      feedbackType: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      feedbackContent: {
        type: DataTypes.STRING(2550),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      processingComments: {
        type: DataTypes.STRING(2550),
        allowNull: true,
      },
      commenterName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      commenterGroup: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      timezone: "+08:00",
    }
  );

  return Feedback;
};
