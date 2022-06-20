'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('passengers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      busId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      passengerName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Passenger must have a Name" },
          notEmpty: { msg: "Passenger name must not be empty" },
        },
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
    await queryInterface.dropTable('passengers');
  }
};