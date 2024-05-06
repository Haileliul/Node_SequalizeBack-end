const settingsModel = (sequelize, DataTypes) => {
  const Settings = sequelize.define(
    "settings",
    {
      // Define other fields if needed
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "userInfos",
          key: "userId",
        },
        // Add other configurations as needed
      },
      settingType: {
        type: DataTypes.STRING,
        // Define other configurations as needed
      },
    },
    {
      // Define composite primary key and other options
      primaryKey: true,
      uniqueKeys: {
        unique_setting: {
          fields: ["userId", "settingType"],
        },
      },

      table: "settings",
      timestamps: false,
    }
  );
  Settings.associate = (models) => {
    // Define associations here
    Settings.belongsTo(models.userInfo, {
      foreignKey: "userId",
    });
  };
  return Settings;
};

export default settingsModel;
