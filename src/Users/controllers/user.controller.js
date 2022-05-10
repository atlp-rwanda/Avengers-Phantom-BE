// @ts-nocheck
const { User } = require("./../../../models");
// const jwtDecode = require("jwt-decode");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json({
      status: "success",
      result: users.length,
      data: {
        users: users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!!",
      err: error.stack,
    });
  }
};

const getUser = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "No user with that ID",
      Error: error.stack,
    });
  }
};

const updateRole = async (req, res) => {
  const uuid = req.params.uuid;
  const { role } = req.body;
  try {
    const user = await User.findOne({ where: { uuid } });

    user.role = role;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "User's role Updated Successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "No user with that ID",
      Error: error.stack,
    });
  }
};

const updateUser = async (req, res) => {
  const uuid = req.params.uuid;
  const {
    name,
    idNumber,
    district,
    sector,
    cell,
    gender,
    email,
    permitId,
    telNumber,
    carplate,
    capacity,
    vehicletype,
  } = req.body;
  try {
    const user = await User.findOne({ where: { uuid } });

    user.name = name;
    user.idNumber = idNumber;
    user.district = district;
    user.sector = sector;
    user.cell = cell;
    user.email = email;
    user.gender = gender;
    user.permitId = permitId;
    user.telNumber = telNumber;
    user.carplate = carplate;
    user.capacity = capacity;
    user.vehicletype = vehicletype;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "User Updated Successully",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "No user with that ID",
      Error: error.stack,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({ where: { uuid } });
    if (!user) {
      return errorRes(res, 404, 'User Not Found');
    }
    const userId = req.user.dataValues.uuid; 
    if (userId === uuid) {
      const { 
    name,
    idNumber,
    district,
    sector,
    cell,
    gender,
    email,
    permitId,
    telNumber,
    carplate,
    capacity,
    vehicletype,
       } = req.body;
      const updatedUser = await User.update(
        {
    name,
    idNumber,
    district,
    sector,
    cell,
    gender,
    email,
    permitId,
    telNumber,
    carplate,
    capacity,
    vehicletype,
        },
        { where: { uuid }, returning: true, plain: true }
      );
      const updatedResponse = updatedUser[1].dataValues;

      return res.status(200).json({
        message: 'User Updated',
        data: updatedResponse
      });
    }
    return res.status(403).json({ message: 'You can only update your profile'});
  } catch (error) {
    return res.status(500).json({ message: 'There was an error while updating', error: error.stack});
  }
};


const deleteUser = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
    });

    await user.destroy();

    res.status(200).json({
      status: "success",
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: "No user with that ID",
      Error: error.stack,
    });
  }
};

module.exports = { getAllUsers, getUser, updateUser, updateProfile,updateRole, deleteUser };
