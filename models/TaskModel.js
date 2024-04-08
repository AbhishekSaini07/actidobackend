const UserModel = require('./UserModel');
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "task",
    {
      taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taskDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taskDeadline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taskStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending"
    },
    taskDoneTime: {
        type: DataTypes.STRING
    }

    },
    {
      tableName: "task",
      createdAt: "taskCreatedTime", // This renames the createdAt field to postTime
      updatedAt: false,
      // Define hooks or methods for handling expiration logic if needed
    }
  );
 

  // Define a method or hook for handling expiration logic if needed

  return Task;
};
