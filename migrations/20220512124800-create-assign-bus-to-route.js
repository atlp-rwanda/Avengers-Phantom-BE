'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('assignbustoroutes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
      },
      routeName: {
        type: DataTypes.STRING
      },
      routeCode: {
        type: DataTypes.STRING
      },
      startingPoint: {
        type: DataTypes.STRING
      },
      endingPoint: {
        type: DataTypes.STRING
      },
      plateNumber: {
        type: DataTypes.STRING
      },
      distance:{
        type:DataTypes.STRING
      },
      duration: {
        type:DataTypes.STRING
      },
      busId:{
        type:DataTypes.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('assignbustoroutes');
  }
};