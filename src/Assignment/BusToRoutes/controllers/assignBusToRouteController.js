const { AssignBusToRoute, Bus, Route } = require("./../../../../models");
const { Op } = require("sequelize");

const createAssignment = async (req, res) => {
  try {
    const { busId, routeId } = req.params;
    const bus = await Bus.findOne({ where: { uuid: busId } });
    if (!bus) {
      return res.status(404).json({
        status: "fail",
        message: "No bus found with that ID",
      });
    }

    const route = await Route.findOne({ where: { uuid: routeId } });

    if (!route) {
      return res.status(404).json({
        status: "fail",
        message: "No route found with that ID",
      });
    }

    const assignment = await AssignBusToRoute.create({
      routeName: route.name,
      routeCode: route.routeCode,
      startingPoint: route.startLocation,
      endingPoint: route.endLocation,
      duration: route.duration,
      distance: route.distance,
      plateNumber: bus.plateNumber,
      busId: bus.id,
    });

    res.status(200).json({
      status: "success",
      message: "Bus Assigned Successfully",
      data: {
        assign: assignment,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error assigning bus to route",
      err: error.stack,
    });
    console.error(error);
  }
};

const getAssignment = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const assignment = await AssignBusToRoute.findOne({
      where: { uuid },
      include: "buses",
    });

    if (!assignment) {
      return res.status(404).json({
        status: "fail",
        message: "No assignment found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        assignments: assignment,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error assigning bus to route",
      err: error.stack,
    });
  }
};

const unAssign = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const assignment = await AssignBusToRoute.findOne({ where: { uuid } });

    if (!assignment) {
      return res.status(404).json({
        status: "fail",
        message: "No assignment found with that ID",
      });
    }

    await assignment.destroy();

    res.status(200).json({
      status: "success",
      message: "Bus un Assigned Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error assigning bus to route",
      err: error.stack,
    });
  }
};

const getAllAssignments = async (req, res) => {
  try {
    
    let buses;

    if ( req.query.origin &&  req.query.destination) {
      buses = await AssignBusToRoute.findAndCountAll({
        where: {
          startingPoint: {
            [Op.eq]: req.query.origin,
          },
          endingPoint: {
            [Op.eq]: req.query.destination,
          },
        },
      });
    }else{

      buses = await AssignBusToRoute.findAndCountAll();

    }

    res.status(200).json({
      status: "success",
      data: {
        buses,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while getting all buses to routes assignment",
    });
  }
};

module.exports = {
  createAssignment,
  getAssignment,
  getAllAssignments,
  unAssign,
};
