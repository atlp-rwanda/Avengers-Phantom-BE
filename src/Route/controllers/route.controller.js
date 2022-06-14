// @ts-nocheck
const { Route } = require("./../../../models");

const createRoute = async (req, res) => {
  try {
    const { name, routeCode, startLocation, endLocation, distance, duration } =
      req.body;

    if (
      !name ||
      !routeCode ||
      !startLocation ||
      !endLocation ||
      !distance ||
      !duration
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid Data, Please provide valid information",
      });
    }

    const route = await Route.findOne({ where: { routeCode } });
    if (route) {
      return res.status(403).json({
        status: "fail",
        message: "This route is already registered",
      });
    }

    const newRoute = await Route.create({
      name,
      routeCode,
      startLocation,
      endLocation,
      distance,
      duration,
    });

    res.status(200).json({
      status: "success",
      data: {
        routes: newRoute,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while creating a new route",
      err: error.stack,
    });
    console.error(error);
  }
};

const getAllRoutes = async (req, res) => {
  try {
    res.status(200).json({ status: "success", routes: res.paginatedResults });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error while getting  routes",
      err: error.stack,
    });
  }
};

const getRoute = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const route = await Route.findOne({
      where: { uuid },
    });

    if (!route) {
      return res.status(404).json({
        status: "fail",
        message: "No route with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        routes: route,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error while getting a route",
      err: error.stack,
    });
  }
};

const updateRoute = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const { name, routeCode, startLocation, endLocation, distance, duration } =
      req.body;

    const route = await Route.findOne({ where: { uuid } });

    if (!route) {
      return res.status(404).json({
        status: "fail",
        message: "No route with that ID",
      });
    }

    route.name = name;
    route.routeCode = routeCode;
    route.startLocation = startLocation;
    route.endLocation = endLocation;
    route.distance = distance;
    route.duration = duration;

    await route.save();

    res.status(200).json({
      status: "success",
      message: "Route Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error while updating a route",
      err: error.stack,
    });
  }
};

const deleteRoute = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const route = await Route.findOne({
      where: { uuid },
    });

    if (!route) {
      return res.status(404).json({
        status: "fail",
        message: "No route with that ID",
      });
    }

    await route.destroy();

    res.status(200).json({
      status: "success",
      message: "Route Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error while updating a route",
      err: error.stack,
    });
  }
};

module.exports = {
  createRoute,
  getAllRoutes,
  getRoute,
  updateRoute,
  deleteRoute,
};
