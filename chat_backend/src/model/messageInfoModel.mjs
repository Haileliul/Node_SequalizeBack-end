const messageModel = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "message",
    {
      messageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "chatInfos",
          key: "chatId",
        },
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      messageType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      readStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deliveryStatus: {
        type: DataTypes.ENUM("sent", "delivered", "read"),
        allowNull: false,
        defaultValue: "sent",
      },
    },
    {
      tableName: "messages",
      timestamps: true,
    }
  );

  Message.associate = (models) => {
    // Define associations here
    Message.belongsTo(models.Conversation, {
      foreignKey: "chatId",
      allowNull: false,
    });
    /*   Message.hasMany(models.Attachment, {
      foreignKey: "messageId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    }); */
    Message.hasMany(models.Emoji, {
      foreignKey: "messageId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Message.hasMany(models.Notification, {
      foreignKey: "messageId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Message;
};

export default messageModel;
