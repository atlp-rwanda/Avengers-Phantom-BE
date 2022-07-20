// @ts-nocheck
const { Stops, Route } = require('../../../models');
const createStops = async (req, res) => {
  const id = req.params.id;
  const route = await Route.findByPk(id);
  try {
    const { name, longitude, latitude } = req.body;
    if (!route) {
      return res
        .status(400)
        .json({
          status: "fail",
          message: "There is no Route matching the provided ID",
        })
    }
    if (
      !name ||
      !longitude ||
      !latitude
    ) {
      return res
        .status(400)
        .json({
          status: 'fail',
          message: 'Missing info, Please provide all route information',
        });
    }
    const stop = await Stops.findOne({ where: { longitude } });

    if (stop) {
      return res
        .status(403).json({
          status: 'fail',
          message: 'The Stop is already registered'
        });
    }
    const RouteId = id;
    const newStop = await Stops.create({
      name,
      longitude,
      latitude,
      RouteId
    });
    res.status(200).json({
      status: 'success',
      newStop,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error while creating a new stop',
      err: error.stack,
    });
    console.error('Error', error)
  }
};

const getAllStops = async (req, res) => {
  try {
    const stops = await Stops.findAndCountAll({
      attributes: { exclude: ["RouteId"] },
      include: [{ model: Route, attributes: ['name'] }]
      // include: ['routeId']
    });
    // const stops = await Stops.findAndCountAll();
    // console.log('=======', stops)
    res.status(200).json({
      status: 'success',
      totalStops: stops.count,
      allStops: stops.rows,
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Error while getting  stops',
      err: error.stack,
    });
  }
};

const getSingleStop = async (req, res) => {
  try {
    const id = req.params.id;
    const stop = await Stops.findByPk(id);
    if (!stop) {
      return res.status(404).json({
        status: 'fail',
        message: 'No Stop found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      stop,
    },
    );
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Error while getting a stop',
      err: error.stack,
    });
  }
};

const updateStop = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, latitude, longitude } = req.body;
    const stop = await Stops.findByPk(id);
    if (!stop) {
      return res.status(404).json({
        status: 'fail',
        message: 'No Stop found with that ID',
      });
    }
    stop.name = name;
    stop.latitude = latitude;
    stop.longitude = longitude;

    await stop.save();

    res.status(200).json({
      status: 'success',
      message: 'Stop Updated Successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Error while updating a Stop',
      err: error.stack,
    });
  }
};

const deleteStop = async (req, res) => {
  try {
    const id = req.params.id;
    const route = await Stops.findByPk(id)
    if (!route) {
      return res.status(404).json({
        status: 'fail',
        message: 'No Stop matching with the provided ID found',
      });
    }
    await route.destroy();
    res.status(200).json({
      status: 'success',
      message: 'Route Deleted Successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Error while deleting route',
      err: error.stack,
    });
  }
};

module.exports = { createStops, getAllStops, getSingleStop, updateStop, deleteStop };
