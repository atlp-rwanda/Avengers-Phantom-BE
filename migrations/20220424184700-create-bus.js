'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      plateNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      YOM: {
        type: DataTypes.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('buses');
  }
};
