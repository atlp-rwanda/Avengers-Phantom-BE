"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Bus, Role,Notification }) {
      this.hasOne(Bus, { foreignKey: "userId", as: "bus" });
      this.belongsTo(Role, { foreignKey: "roleId", as: "role" });
      this.hasMany(Notification, {foreignKey: 'receiver',as: 'notifications',onDelete: 'CASCADE',onUpdate: 'CASCADE'});
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        passwordResetToken: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        // isAssigned: undefined,
        password: undefined,
        bus: undefined,
      };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver or Operator must have a Role" },
          notEmpty: { msg: "Role must not be empty" },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver or Operator must have a gender" },
          notEmpty: { msg: "Gender must not be empty" },
        },
      },
      idNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver or Operator must have an ID" },
          notEmpty: { msg: "ID must not be empty" },
        },
        unique: true,
      },

      district: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver or Operator must have a District" },
          notEmpty: { msg: "District must not be empty" },
        },
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver or Operator must have a Sector" },
          notEmpty: { msg: "Sector must not be empty" },
        },
      },
      cell: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver or Operator must have Cell" },
          notEmpty: { msg: "Cell must not be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver or Operator must have an Email" },
          notEmpty: { msg: "Email must not be empty" },
          isEmail: { msg: "Provide a valid email address" },
        },
        unique: true
      },
      permitId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      telNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver or Operator must have Telephone Number" },
          notEmpty: { msg: "Telephone must not be empty" },
        },
        unique: true
      },
      carplate: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      vehicletype: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
      },
      roleName: {
        type: DataTypes.STRING,
      },
      isAssigned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      profilePicture: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      passwordResetToken: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
