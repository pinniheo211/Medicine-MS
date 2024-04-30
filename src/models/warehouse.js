//tao bang trong day
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WareHouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      WareHouse.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  WareHouse.init(
    {
      userId: DataTypes.INTEGER,
      warehouseName: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "WareHouse",
    }
  );
  return WareHouse;
};
