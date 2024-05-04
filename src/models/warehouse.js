//tao bang trong day
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WareHouse extends Model {
    static associate(models) {
      WareHouse.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      WareHouse.hasMany(models.Product, {
        foreignKey: "warehouseId",
        as: "products",
      });
    }
  }
  WareHouse.init(
    {
      warehouseId: {
        type: DataTypes.STRING,
        primaryKey: true, // Đặt trường này là trường chính
        autoIncrement: false, // Nếu cần tự động tăng
      },
      userId: DataTypes.INTEGER,
      warehouseName: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "WareHouse",
    }
  );
  return WareHouse;
};
