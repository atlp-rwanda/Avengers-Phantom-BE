"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("routes", {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      routeCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      distance: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("routes");
  },
};
