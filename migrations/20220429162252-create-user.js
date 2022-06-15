"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cell: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permitId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      carplate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      vehicletype: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
<<<<<<< HEAD
      },
      roleId: {
        type: DataTypes.INTEGER,
      },
      roleName: {
        type: DataTypes.STRING,
=======
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
      passwordResetToken: {
        type: DataTypes.STRING,
        defaultValue: "",
>>>>>>> 1254268... ft(roles):user roles
      },
      isAssigned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      passwordResetToken: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
<<<<<<< HEAD
  }});
=======
      },
    });
>>>>>>> 1254268... ft(roles):user roles
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("users");
  },
};
