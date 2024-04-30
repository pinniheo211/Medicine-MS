//tao bang trong day
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "category_code",
        targetKey: "code",
        as: "categoryData",
      });
      Product.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Product.init(
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      available: DataTypes.INTEGER,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      category_code: DataTypes.STRING,
      filename: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
