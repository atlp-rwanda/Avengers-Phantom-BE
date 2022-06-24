const { Bus } = require("./../../../models");


const createBus = async (req, res) => {
  try {
    const {
      company,
      type,
      plateNumber,
      manufacturer,
      capacity,
      yearOfManufacturing,
    } = req.body;

    const bus = await Bus.findOne({ where: { plateNumber } });

    if (bus) {
      return res.status(403).json({
        status: "fail",
        message: "Sorry this bus is already existing, Please try again",
      });
    }

    const newBus = await Bus.create({
      company,
      type,
      plateNumber,
      manufacturer,
      capacity,
      yearOfManufacturing,
    });

    res.status(200).json({
            status:req.t('success status'),
            message:req.t("successful creation"),
            data:{
                buses:newBus
            }
        })
    } catch (error) {
        res.status(404).json({
            status:req.t('fail status'),
            message:req.t('bus wrong ID'),
            err:error.stack
        })
        
    }
}

const getAllBuses = async (req, res) => {
  try {
    res.status(200).json(res.paginatedResults);
  } catch (error) {
    res.status(404).json({
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
      status:req.t('success status'),
      message:req.t('bus update success')
    });
  } catch (error) {
    res.status(404).json({
      status:req.t('fail staus'),
      message:req.t('bus wrong ID'),
      err:error.stack
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
      message:req.t('bus delete success'),
    });
  } catch (error) {
    res.status(404).json({
      status:req.t('fail status'),
      message:req.t('bus wrong ID'),
      err:error.stack
    });
  }
};

module.exports = { createBus, getAllBuses, getBus, updateBus, deleteBus };
