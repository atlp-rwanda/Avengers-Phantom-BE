'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        passwordResetToken:undefined
      };
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Driver or Operator must have a Role' },
        notEmpty: { msg: 'Role must not be empty' }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Driver or Operator must have a gender' },
        notEmpty: { msg: 'Gender must not be empty' }
      }
    },
    idNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Driver or Operator must have an ID' },
        notEmpty: { msg: 'ID must not be empty' }
      }
    },
    
    district: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Driver or Operator must have a District' },
        notEmpty: { msg: 'District must not be empty' }
      }
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Driver or Operator must have a Sector' },
        notEmpty: { msg: 'Sector must not be empty' }
      }
    },
    cell: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Driver or Operator must have Cell' },
        notEmpty: { msg: 'Cell must not be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Driver or Operator must have an Email' },
        notEmpty: { msg: 'Email must not be empty' },
        isEmail: { msg: 'Provide a valid email address' }
      }
    },
    permitId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Driver or Operator must have Telephone Number' },
        notEmpty: { msg: 'Telephone must not be empty' }
      }
    },
    carplate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    vehicletype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
   type: DataTypes.STRING,
   allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Driver or Operator must have a Role' },
        notEmpty: { msg: 'Driver or Operator must not be empty' }
      }
    },
    passwordResetToken:{
      type:DataTypes.STRING,
      defaultValue:""
    }
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });
  return User;
};
