// @ts-nocheck
const { Roles } = require('../../../models');

const createRole = async (req, res) => {
  try {
    const { roleName, permissions } = req.body;

    console.log(roleName, permissions);
    const newRole = await Roles.create({
      roleName,
      permissions
    });

    console.log(newRole);
    res.status(201).json({
      status: req.t('success status'),
      message: req.t('role created message'),
      data: {
        role: newRole
      }
    });
  } catch (error) {
    res.status(500).json({
      status: req.t('fail status'),
      message: req.t('try again message'),
      err: error
    });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll();
    res.status(201).json({
      status: req.t('success status'),
      result: roles.length,
      data: {
        roles: roles
      }
    });
  } catch (error) {
    res.status(500).json({
      status: req.t('fail status'),
      message: req.t('try again message'),
      err: error.stack
    });
  }
};

const getRole = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const role = await Roles.findOne({
      where: { uuid }
    });
    res.status(200).json({
      status: req.t('success status'),
      data: {
        role
      }
    });
  } catch (error) {
    res.status(404).json({
      message: req.t('role wrong id'),
      Error: error.stack
    });
  }
};

const updateRole = async (req, res) => {
  const uuid = req.params.uuid;
  const { roleName, permissions } = req.body;
  try {
    const role = await Roles.findOne({ where: { uuid } });

    role.roleName = roleName;
    role.permissions = permissions;
    await role.save();

    res.status(200).json({
      status: req.t('success status'),
      message: req.t('role update message'),
      data: {
        role
      }
    });
  } catch (error) {
    res.status(404).json({
      message: req.t('role wrong id'),
      Error: error.stack
    });
  }
};

const deleteRole = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const role = await Roles.findOne({
      where: { uuid }
    });

    await role.destroy();

    res.status(200).json({
      status: req.t('success status'),
      message: req.t('role deleted message')
    });
  } catch (error) {
    res.status(404).json({
      message: req.t('role wrong id'),
      Error: error.stack
    });
  }
};

module.exports = { createRole, getAllRoles, getRole, updateRole, deleteRole };
