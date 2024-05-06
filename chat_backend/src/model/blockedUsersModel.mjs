const blockedUsersModel = (sequelize, DataTypes) => {
  const BlockedUsers = sequelize.define(
    "blocked_users",
    {
      // Define specific fields
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "userInfos",
          key: "userId",
        },
      },
      blockedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "userInfos",
          key: "userId",
        },
      },
    },
    {
      timestamps: false, // Disable timestamps
      table: "blockedusers",
    }
  );

  BlockedUsers.associate = (models) => {
    // Define associations here
    BlockedUsers.belongsTo(models.userInfo, {
      foreignKey: "userId",
      as: "blockingUser",
    });
    BlockedUsers.belongsTo(models.userInfo, {
      foreignKey: "blockedUserId",
      as: "blockedUser",
    });
  };

  return BlockedUsers;
};

export default blockedUsersModel;
