const attachmentModel = (sequelize, DataTypes) => {
  const Attachment = sequelize.define(
    "attachment",
    {
      attachmentId: {
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
      attachmentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attachmentUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "attachments",
      timestamps: true,
    }
  );

  Attachment.associate = (models) => {
    // Define associations here
    Attachment.belongsTo(models.messages, {
      foreignKey: "messageId",
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Attachment;
};

export default attachmentModel;
