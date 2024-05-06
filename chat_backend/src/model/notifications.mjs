const notificationModel = (sequelize, DataTypes) => {
  const Notification = sequelize.define("notification", {
    notificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "userInfos",
        key: "userId",
      },
    },
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "messages",
        key: "messageId",
      },
    },
    notificationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    seenStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Notification.associate = (models) => {
    // Define associations here
    Notification.belongsTo(models.userInfo, {
      foreignKey: "receiverId",
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Notification.belongsTo(models.Message, {
      foreignKey: "messageId",
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Notification;
};

export default notificationModel;
