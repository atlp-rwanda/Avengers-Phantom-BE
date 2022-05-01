// @ts-nocheck
const { Route } = require("../../../models")

const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.findAll()
    res.status(201).json({
      status: "success",
      result: routes.length,
      data: {
        routes: routes,
      },
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!!",
      err: error.stack,
    })
  }
}

const getRoute = async (req, res) => {
  const uuid = req.params.uuid
  try {
    const route = await Route.findOne({
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
      message: "No route with that ID",
      Error: error.stack,
    })
  }
}

const updateRoute = async (req, res) => {
  const uuid = req.params.uuid
  const {
    name,
    idNumber,
    carplate,
    capacity,
    vehicletype,
  } = req.body
  try {
    const route = await Route.findOne({ where: { uuid } })

    route.name = name
    route.idNumber = idNumber
    route.carplate = carplate
    route.capacity = capacity
    route.vehicletype = vehicletype
    await route.save()

    res.status(200).json({
      status: "success",
      message: "Route Updated Successfully",
      data: {
        route,
      },
    })
  } catch (error) {
    res.status(404).json({
      message: "No route with that ID",
      Error: error.stack,
    })
  }
}

const deleteRoute = async (req, res) => {
  const uuid = req.params.uuid
  try {
    const route = await Route.findOne({
      where: { uuid },
    })

    await route.destroy()

    res.status(200).json({
      status: "success",
      message: "Route Deleted Successfully",
    })
  } catch (error) {
    res.status(404).json({
      message: "No route with that ID",
      Error: error.stack,
    })
  }
}

module.exports = { getAllRoutes, getRoute, updateRoute, deleteRoute }
