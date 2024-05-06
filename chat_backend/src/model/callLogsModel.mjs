const callLogsModel = (sequelize, DataTypes) => {
  const CallLogs = sequelize.define("call_logs", {
    callId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    callerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "userInfos",
        key: "userId",
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "userInfos",
        key: "userId",
      },
    },
    callType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    callDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    callTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  CallLogs.associate = (models) => {
    // Define associations here
    CallLogs.belongsTo(models.userInfo, {
      foreignKey: "callerId",
      as: "caller",
    });
    CallLogs.belongsTo(models.userInfo, {
      foreignKey: "receiverId",
      as: "receiver",
    });
  };

  return CallLogs;
};

export default callLogsModel;
