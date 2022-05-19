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
      status: "success",
      message: "Role created successfully 👍🏾",
      data: {
        role: newRole,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while creating role",
      err: error.stack,
    });
    console.error(error);
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAndCountAll();

    res.status(201).json({
      status: "success",
      data: {
        roles,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while getting all roles",
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
    if (!role) {
      return res.status(404).json({
        status: "fail",
        message: "No role Name found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        roles: role,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error while getting a role",
      err: error.stack,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const { roleName } = req.body;

    const role = await Role.findOne({ where: { uuid } });

    if (!role) {
      return res.status(404).json({
        status: "fail",
        message: "No role Name found with that ID",
      });
    }

    role.roleName = roleName;

    await role.save();

    res.status(200).json({
      status: "success",
      message: "Role Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "No role with that ID",
      err: error.stack,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const role = await Role.findOne({
      where: { uuid },
    });

    if (!role) {
      return res.status(404).json({
        status: "fail",
        message: "No role Name found with that ID",
      });
    }

    await role.destroy();

    res.status(200).json({
      status: "success",
      message: "Role Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error while deleting a role",
      err: error.stack,
    });
  }
};

module.exports = { createRole, getAllRoles, getRole, updateRole, deleteRole };
