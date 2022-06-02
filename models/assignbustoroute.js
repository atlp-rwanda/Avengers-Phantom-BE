"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AssignBusToRoute extends Model {
    static associate({Bus}) {
      this.belongsTo(Bus,{ foreignKey:'busId',as:"buses"})
    }
    toJSON() {
      return {
        ...this.get(),
        id:undefined,
        createdAt:undefined,
        updatedAt:undefined,
        busId:undefined,
      };
    }
  }
  AssignBusToRoute.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      routeName: DataTypes.STRING,
      routeCode: DataTypes.STRING,
      startingPoint: DataTypes.STRING,
      endingPoint: DataTypes.STRING,
      plateNumber: DataTypes.STRING,
      distance:DataTypes.STRING,
      duration: DataTypes.STRING,
      busId:DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "assignbustoroutes",
      modelName: "AssignBusToRoute",
    }
  );
  return AssignBusToRoute;
};
