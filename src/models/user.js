"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: "role_code",
        targetKey: "code",
        as: "roleData",
      });
      User.hasMany(models.WareHouse, {
        foreignKey: "userId",
        as: "warehouses",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      company: DataTypes.STRING,
      avatar: DataTypes.STRING,
      role_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
