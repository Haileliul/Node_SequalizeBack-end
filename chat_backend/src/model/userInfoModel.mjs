const userInfoModel = (sequelize, DataTypes) => {
  const userInfo = sequelize.define(
    "userInfo",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phonenumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^\d{10}$/,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        /*  validate: {
          len: [6, 10], // Example: Minimum length of 6 characters
        }, */
      },
      profileimageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastSeen: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      onlineStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "userInfos",
      timestamps: true,
    }
  );

  return userInfo;
};

export default userInfoModel;
