// @ts-nocheck
const { User, Role } = require("../../../models");
const { errorResponse } = require("../../Helpers/response");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAndCountAll({
      attributes: { exclude: ["RoleId"] },
      include: [{ model: Role, attributes: ['name'] }]
    });
    res.status(200).json({
      status: req.t('success status'),
      totalUsers: users.count,
      users: users.rows
    });
  } catch (error) {
    res.status(500).json({
      status: req.t("fail status"),
      message: req.t("try again message"),
      err: error.stack,
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      attributes: { exclude: ["RoleId"] },
      where: { id },
      include: ["Role"],
    });
    res.status(200).json({
      status: req.t("success message"),
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Error",
      Error: error.stack,
    });
  }
};

const changeRole = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const role = await Role.findOne({ where: { name } });
  console.log('=======', role)

  if (!role) {
    res.status(404).json({
      message: req.t("Role does not exists"),
    });
  }
  else {
    try {
      const user = await User.findByPk(id);
      user.setRole(role);
      res.status(200).json({
        status: req.t("success status"),
        message: req.t("user role updated message"),
        data: {
          user,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: req.t("User Not Found"),
        Error: error.stack,
      });
    }
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const update = req.body;

  try {
    const user = await User.findOne({ where: { id } });
    Object.entries(update).forEach(e => e[1] ? user[e[0]] = e[1] : '');
    await user.save();

    res.status(200).json({
      status: req.t("success status"),
      message: req.t("user update message"),
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: req.t("User Not Found"),
      Error: error.stack,
    });
  }
};

const updateProfile = async (req, res) => {
  const id = req.params.id;
  const allowed = ["district", "sector", "cell", "telNumber", "profilePicture"];
  const update = req.body;
  const restricted = Object.keys(update).filter((v) => update[v] && !allowed.includes(v));
  if (restricted.length)
    return errorResponse(res, { status: 400, message: `${restricted.join(", ")} are not editable.` })
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    Object.entries(update).forEach(e => e[1] ? user[e[0]] = e[1] : '');
    const updated = await user.save();
    return res.status(200).json({
      status: req.t("success status"),
      message: req.t("user update message"),
      user: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "There was an error while updating",
      error: error.stack,
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
    });

    await user.destroy();

    res.status(200).json({
      status: req.t("success status"),
      message: req.t("user deleted message"),
    });
  } catch (error) {
    res.status(404).json({
      message: req.t("user wrong ID"),
      Error: error.stack,
    });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  updateProfile,
  changeRole,
  deleteUser,
};
