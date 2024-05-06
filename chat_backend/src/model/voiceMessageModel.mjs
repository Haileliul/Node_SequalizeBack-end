const voiceMessagesModel = (sequelize, DataTypes) => {
  const VoiceMessages = sequelize.define("voice_messages", {
    voiceMessageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    senderId: {
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
    voiceMessageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    voiceMessageDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  VoiceMessages.associate = (models) => {
    // Define associations here
    VoiceMessages.belongsTo(models.userInfo, {
      foreignKey: "senderId",
      as: "sender",
    });
    VoiceMessages.belongsTo(models.userInfo, {
      foreignKey: "receiverId",
      as: "receiver",
    });
  };

  return VoiceMessages;
};

export default voiceMessagesModel;
