// @ts-nocheck
const express = require("express")
const cors = require("cors")
const swaggerUI = require("swagger-ui-express")
const swaggerDocumentation = require("./src/docs/swagger.js")

const { User } = require("./models")

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    }
  });

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Phantom Project Powered By Avengers!!",
  })
})

app.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocumentation)
)

app.post("/users", async (req, res) => {
  const { name, email, role } = req.body
  try {
    const user = await User.create({ name, email, role })
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Something went wrong!!!",
    })
  }
})
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    })
  } catch (error) {
    res.status(404).json({
      message: "No user with that ID",
      Error: error.stack,
    })
  }
})
app.get("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({
      where: { uuid },
    })
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    })
  } catch (error) {
    res.status(404).json({
      message: "No user with that ID",
      Error: error.stack,
    })
  }
})

app.delete("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({
      where: { uuid },
    })
    await suer.destroy()
    res.status(200).json({
      status: "success",
      message: "User Delete Successully",
    })
  } catch (error) {
    res.status(404).json({
      message: "No user with that ID",
      Error: error.stack,
    })
  }
})

module.exports = app
