// @ts-nocheck
const { User } = require("./../../models")
const jwt = require("jsonwebtoken")
const PassGenerator = require("generate-password")
const sendEmail = require("../utils/Email")
const bcrypt = require("bcryptjs")

const signToken = (uuid) => {
  return jwt.sign({ uuid }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const signup = async (req, res) => {
  try {
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
      role,
    } = req.body

    const password = PassGenerator.generate({
      length: 8,
      numbers: true,
    })
    const hashedPass = await bcrypt.hash(password, 12)

    const user = await User.findOne({
      where: { email },
    })

    if (user) {
      return res.status(403).json({
        message: "User Already Exist Please use a different account",
      })
    }
    const newUser = await User.create({
      name,
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
      password: hashedPass,
    })

    res.status(201).json({
      status: "success",
      password: `${password}`,
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        message: "Please Provide email and password",
      })
    }

    const user = await User.findOne({ where: { email } })

    if (!user || !(password === user.password)) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      })
    }

    const token = signToken(user.uuid)
    res.status(200).json({
      status: "success",
      message: `${user.name} successfully Logged in!!`,
      token,
      data: {
        user,
      },
    })
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized User Please try again",
      err: error.stack,
      errorMessage: error,
    })
  }
}

module.exports = { signup, login }
