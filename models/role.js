'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate({ User, Permission }) {
      this.hasMany(User, { foreignKey: "RoleId", as: 'Position' });
      this.belongsToMany(Permission, {
        through: 'RolePermission',
      })
    }
    toJSON() {
      return {
        ...this.get(),
        // id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Role.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Role must have a Name' },
          notEmpty: { msg: 'Role name must not be empty' },
          unique: { msg: 'Role name already exist' }
        },
      },
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Role'
    }
  );
  return Role;
};
