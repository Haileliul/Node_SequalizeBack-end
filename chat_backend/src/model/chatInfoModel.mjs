const chatInfoModel = (sequelize, DataTypes) => {
  const chatInfo = sequelize.define(
    "chatInfo",
    {
      chatId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      groupChat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Assuming default is false for one-on-one chats
      },
      lastmessageTimestamp: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      unreadMessageCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default value is 0
      },
      archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Default value is false
      },
    },
    {
      tableName: "chatInfos",
      timestamps: true,
    }
  );

  return chatInfo;
};

export default chatInfoModel;
