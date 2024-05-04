"use strict";
const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("WareHouses", {
      warehouseId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      userId: { type: Sequelize.INTEGER },
      warehouseName: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      address: { type: Sequelize.STRING },
      status: { type: Sequelize.INTEGER },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Warehouses");
  },
};
