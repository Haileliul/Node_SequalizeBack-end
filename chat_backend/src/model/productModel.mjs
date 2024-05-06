// Assuming you have a User model defined similarly as the Product model
// Import User model if not already imported

// import { BelongsToMany } from "sequelize";

const productModel = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
      published: {
        type: DataTypes.BOOLEAN,
      },
      userId: {
        // Foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      tableName: "products",
      indexes: [{ unique: true, fields: ["title"] }],
      paranoid: true,
    }
  );

  // Define association with User model
  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: {
        foreignKey: "userId", // This defines the name of the foreign key column in the Product table
        allowNull: false,
      },
    });
  };

  // this Assosiation is  for many to  many

  /*  User.associate = models => {
    // Define associations here
    User.hasMany(models.Post);
    User.belongsToMany(models.Group, { through: 'UserGroup' });
  }; */

  return Product;
};

export default productModel;

// other types of assosiations in relation
// - hasOne  one t one
// - hasMany  one to many
// - belongsTo  mant to one
// - belongsToMany  many to many
