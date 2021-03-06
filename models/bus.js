"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "userId",as:"user" });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
        createdAt: undefined,
        updatedAt:undefined,
      };
    }
  }
  Bus.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Bus must have a company" },
          notEmpty: { msg: "company must not be empty" },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Bus must have a Type" },
          notEmpty: { msg: "Type must not be empty" },
        },
      },
      plateNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Bus must have a plateNumber" },
          notEmpty: { msg: "plateNumber must not be empty" },
        },
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Bus must have a Manufacturer" },
          notEmpty: { msg: "Manufacturer must not be empty" },
        },
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Bus must have a capacity" },
          notEmpty: { msg: "Capacity must not be empty" },
        },
      },
      yearOfManufacturing: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Bus must have a Year Of Manufacturing" },
          notEmpty: { msg: "Year Of Manufacturing must not be empty" },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull:true,
        defaultValue:null
      },
      isAssigned: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      }
    },
    {
      sequelize,
      tableName: "buses",
      modelName: "Bus",
    }
  );
  return Bus;
};
