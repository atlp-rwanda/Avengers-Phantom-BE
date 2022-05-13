const { User, Bus } = require("../../../../models");
const sendEmail = require("../../../utils/Email");

const AssignDriverToBus = async (req, res) => {
  try {
    const driverId = req.params.driverId;
    const busId = req.params.busId;

    const user = await User.findOne({ where: { uuid: driverId } });

    if (!user) {
      return res.status(404).josn({
        status: "fail",
        message: "The Driver found with that ID",
      });
    } else if (user.role !== "driver") {
      return res.status(403).json({
        status: "fail",
        message: "The user is not a Driver, try again",
      });
    } else if (user.isAssigned) {
      return res.status(403).json({
        status: "fail",
        message: "Driver is already assigned to a Bus",
      });
    } else {
      user.isAssigned = true;
      await user.save();
    }

    const bus = await Bus.findOne({ where: { uuid: busId } });

    if (!bus) {
      return res.status(404).json({
        status: "fail",
        message: "No Bus found with that ID",
      });
    } else if (bus.isAssigned) {
      return res.status(403).json({
        status: "fail",
        message: `This Bus is already assigned to someone`,
      });
    } else {
      bus.userId = user.id;
      bus.isAssigned = true;
      await bus.save();
    }

    const message = `
    Dear ${user.name},
    Congratulations, you have been given a new Bus having the following characteristics
    __________________________________________________________________________________
    Type:${bus.type}, Plate Number :${bus.plateNumber}.`;

    await sendEmail({
      email: user.email,
      subject: "Congratulations, You have been Assigned to a new Bus.",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Email has been sent successfully to Driver's Email",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error while Assigning Driver To Bus",
    });
  }
};

const unAssignDriverToBus = async (req, res) => {
  try {
    const driverId = req.params.driverId;
    const busId = req.params.busId;

    const user = await User.findOne({ where: { uuid: driverId } });

    if (!user) {
      return res.status(404).josn({
        status: "fail",
        message: "No Driver found with that ID",
      });
    } else if (user.role !== "driver") {
      return res.status(403).json({
        status: "fail",
        message: "The user is not a Driver, try again",
      });
    } else if (!user.isAssigned) {
      return res.status(403).json({
        status: "fail",
        message: "The user is not assigned to any bus, Please try again",
      });
    } else {
      user.isAssigned = false;
      await user.save();
    }

    const bus = await Bus.findOne({ where: { uuid: busId } });

    if (!bus) {
      return res.status(404).json({
        status: "fail",
        message: "No Bus found with that ID",
      });
    } else if (!bus.isAssigned) {
      return res.status(403).json({
        status: "fail",
        message: "This Bus is not assigned to any one",
      });
    } else {
      bus.userId = null;
      bus.isAssigned = false;
      await bus.save();
    }

    const message = `
        Dear ${user.name},you have been un assigned from a Bus you have been driving having the following characteristics
        _________________________________________________________________________________________________________________
        Type:${bus.type}, Plate Number :${bus.plateNumber}.`;

    await sendEmail({
      email: user.email,
      subject: "Phantom Has un assigned you from a Bus you have been Driving.",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Email has been sent successfully to Driver's Email",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error While removing Driver from driving this Bus",
    });
  }
};

const AllAssignedDrivers = async (req, res) => {
  try {
    res.status(200).json(res.paginatedResults);
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error while Getting all Assigned Drivers",
      error: error,
    });
  }
};

const AllAssignedBusses = async (req, res) => {
  try {
    const buses = await Bus.findAll({ include: "user" });

    res.status(200).json({
      status: "success",
      result: buses.length,
      data: {
        buses,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error while Getting all Assigned Drivers",
    });
  }
};
module.exports = {
  AssignDriverToBus,
  unAssignDriverToBus,
  AllAssignedDrivers,
  AllAssignedBusses,
};
