// @ts-nocheck
const { Role } = require("../../../models");

const createRole = async (req, res) => {
  try {
    const { roleName } = req.body;

    if (!roleName) {
      return res.status(403).json({
        status: "fail",
        message: "Please Provide a Role Name",
      });
    }

    const role = await Role.findOne({ where: { roleName } });

    if (role) {
      return res.status(403).json({
        status: "fail",
        message: "Role Name is already existing, Please try again",
      });
    }

    const newRole = await Role.create({
      roleName,
    });

    res.status(201).json({
      status: req.t("success status"),
      message: req.t("role created message"),
      data: {
        role: newRole,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: req.t("fail status"),
      message: req.t("try again message"),
      err: error,
    });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAndCountAll();

    res.status(200).json({
      status: req.t('success status'),
      result: roles.length,
      data: {
        roles,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: req.t("fail status"),
      message: req.t("try again message"),
      err: error.stack,
    });
    console.error(error);
  }
};

const getRole = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const role = await Role.findOne({
      where: { uuid },
      include: ["user"],
    });
    res.status(200).json({
      status: req.t("success status"),
      data: {
        role,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: req.t("role wrong id"),
      Error: error.stack,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const { roleName } = req.body;

    const role = await Role.findOne({ where: { uuid } });
    role.roleName = roleName;

    await role.save();

    res.status(200).json({
      status: req.t("success status"),
      message: req.t("role update message"),
      data: {
        role,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: req.t("role wrong id"),
      Error: error.stack,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const role = await Role.findOne({
      where: { uuid },
    });
    await role.destroy();

    res.status(200).json({
      message: req.t("role deleted message"),
    });
  } catch (error) {
    res.status(404).json({
      message: req.t("role wrong id"),
      Error: error.stack,
    });
  }
};

module.exports = { createRole, getAllRoles, getRole, updateRole, deleteRole };
