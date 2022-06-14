'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Stops', {
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
      latitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      longitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      RouteId: {
        type: DataTypes.UUID,
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
    await queryInterface.dropTable('Stops');
  }
};