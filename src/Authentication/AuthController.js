// @ts-nocheck
const { User } = require("./../../models")
const jwt = require("jsonwebtoken")
const PassGenerator = require("generate-password")
const sendEmail = require("../utils/Email")

const signToken = (uuid) => {
  return jwt.sign({ uuid }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const signup = async (req, res) => {
  try {
    const {
      driverName,
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
      role,
    } = req.body

    const password = PassGenerator.generate({
      length: 8,
      numbers: true,
    })

    const user = await User.findOne({
      where: { email },
    })

    if (user) {
      return res.status(403).json({
        message: "User Already Exist Please use a different account",
      })
    }
    const newUser = await User.create({
      driverName,
      idNumber,
      district,
      sector,
      cell,
      gender,
      permitId,
      telNumber,
      carplate,
      capacity,
      vehicletype,
      role,
      email,
      password,
    })

    res.status(201).json({
      status: "success",
      message: "Email Sent successfully 👍🏾",
      data: {
        user: newUser,
      },
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong try Again!!",
      err: error.stack,
    })
  }
}

module.exports = { signup }
