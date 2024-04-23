// models/Comment.js
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      minutesId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      commenterId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      commentContent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentCommentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      likeCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      timezone: "+08:00",
    }
  );

  return Comment;
};
