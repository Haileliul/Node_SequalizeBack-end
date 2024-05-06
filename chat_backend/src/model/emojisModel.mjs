const emojiReactionModel = (sequelize, DataTypes) => {
  const EmojiReaction = sequelize.define(
    "emoji_reaction",
    {
      emojiReactionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      messageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "messages",
          key: "messageId",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reactionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "emoji_reactions",
      timestamps: true,
      underscored: true,
    }
  );

  EmojiReaction.associate = (models) => {
    // Define associations here
    EmojiReaction.belongsTo(models.messages, {
      foreignKey: "messageId",
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    EmojiReaction.belongsTo(models.User, {
      foreignKey: "userId",
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return EmojiReaction;
};

export default emojiReactionModel;
