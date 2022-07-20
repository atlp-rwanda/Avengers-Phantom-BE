"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stops extends Model {
    static associate({ Route }) {
      this.belongsTo(Route, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      // this.belongsTo(Route);
    }

    toJSON() {
      return {
        ...this.get(),
        // id: undefined,
        updatedAt: undefined,
        createdAt: undefined,

      };
    }
  }
  Stops.init(
    {
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
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Stops",
    }
  );
  return Stops;
};
