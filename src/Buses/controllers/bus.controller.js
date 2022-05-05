const { Bus, User } = require("./../../../models");

const createBus = async (req, res) => {
  try {
    const {
      company,
      type,
      plateNumber,
      manufacturer,
      capacity,
      yearOfManufacturing,
      // userUuid,
    } = req.body;

   

    // const user = await User.findOne({ where: { uuid: userUuid } });

    // if (!user) {
    //   return res.status(404).json({
    //     status: "fail",
    //     message: "No User found with That ID",
    //   });
    // }
    // console.log("user", user);

    const newBus = await Bus.create({
      company,
      type,
      plateNumber,
      manufacturer,
      capacity,
      yearOfManufacturing,
      // userId: user.id,
    });

    res.status(201).json({
      status: "success",
      message: "Created Sucessfully!!",
      data: {
        buses: newBus,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Invalid Inputs Please Try Again",
      err:error.stack,
    });
  }
};

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.findAll();
    res.status(200).json({
      status: "success",
      data: {
        buses,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something Went Very Wrong 👎🏿",
      err: error.stack,
    });
  }
};

const getBus = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const bus = await Bus.findOne({ where: { uuid } });
    res.status(200).json({
      status: "success",
      data: {
        buses: bus,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "No bus found with that ID!",
      err: error.stack,
    });
  }
};

const updateBus = async (req, res) => {
  const { company, type, plateNumber, manufacturer, capacity, YOM } = req.body;

  const uuid = req.params.uuid;

  try {
    const bus = await Bus.findOne({
      where: { uuid },
    });
    bus.company = company;
    bus.type = type;
    bus.plateNumber = plateNumber;
    bus.manufacturer = manufacturer;
    bus.capacity = capacity;
    bus.YOM = YOM;

    await bus.save();
    res.status(200).json({
      status: "successs",
      message: "Bus updated Successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "No Bus found with that ID!",
      err: error.stack,
    });
  }
};

const deleteBus = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const bus = await Bus.findOne({
      where: { uuid: uuid },
    });
    await bus.destroy();
    res.status(200).json({
      message: "Bus Delete Successfully!!",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "No Bus found with that ID!!",
      err: error.stack,
    });
  }
};

module.exports = { createBus, getAllBuses, getBus, updateBus, deleteBus };
