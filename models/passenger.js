'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Passenger extends Model {

    
    static associate({Bus}) {
      this.belongsTo(Bus, {foreignKey: "busId", as: "bus"})
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
      }
    }
  }
  Passenger.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    passengerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Passenger must have a Name" },
        notEmpty: { msg: "Passenger name must not be empty" },
      },
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: "passengers",
    modelName: 'Passenger',
  });
  return Passenger;
};