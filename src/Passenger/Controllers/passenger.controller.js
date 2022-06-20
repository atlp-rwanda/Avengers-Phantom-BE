const { Passenger, Bus } = require("../../../models");

const createPassenger = async (req, res) => {
    try {
        const { passengerName } = req.body;
        const busId= req.params.busId;
       

        const bus = await Bus.findOne({ where: { uuid:busId }});

        if(!bus) {
          return res.status(404).json({
            status: "fail",
            message: "No bus with that ID",
        });
        }
        
        if (!passengerName) {
            return res.status(403).json({
                status: "fail",
                message: "Please Provide a Passenger name",
            });
        }

        const passenger = await Passenger.findOne({ where: { passengerName}});
        
        if (passenger) {
          return res.status(403).json({
            status: "fail",
            message: "Passenger name already exists",
          });
        }

       const newPassenger = await Passenger.create({
           passengerName,
           busId:bus.id
       });
       await Bus.update({
         passengers: bus.passengers + 1
       },{where: {uuid:busId}})

       res.status(201).json({
           status: "success",
           message: "Passenger created successfully",
           data: {
               passenger: newPassenger,
           },
       });


    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Error while creating a new passenger",
            err: error.stack
          });
          console.error(error);
    }
};

const removePassenger = async (req, res) => {
  try {
      const passengerId = req.params.uuid;
      const { busId } = req.params;

      const bus = await Bus.findOne({ where: {uuid:busId}});
      console.log(bus)
      if(!bus) {
        return res.status(404).json({
          status: "fail",
          message: "No bus with that ID",
      });
      }

     const passenger = await Passenger.findOne({ where: { uuid: passengerId }});

     const removeP = await Passenger.destroy({ where:{uuid: passengerId}});
     console.log("type passenger" ,typeof bus.passengers)
     await Bus.update({
       passengers: bus.passengers - 1
     },{where: {uuid:busId}})

     res.status(201).json({
         status: "success",
         message: "Passenger removing successfully",
         data: {
             passenger: removeP,
         },
     });


  } catch (error) {
      res.status(500).json({
          status: "fail",
          message: "Error while removing a new passenger",
          err: error.stack
        });
        // console.error(error);
  }
};

const getAllPassengers = async (req, res) => {
    try {
        const passengers = await Passenger.findAndCountAll();
    
        res.status(201).json({
          status: "success",
          data: {
            passengers,
          },
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "Error while getting all passengers",
          err: error.stack,
        });
        console.error(error);
      }
};
const getPassenger = async (req, res) => {
    try {
      const uuid = req.params.uuid;
  
      const passenger = await Passenger.findOne({
        where: { uuid },
        include: ["bus"],
      });
      if (!passenger) {
        return res.status(404).json({
          status: "fail",
          message: "No passenger Name found with that ID",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          passenger,
        },
      });
    } catch (error) {
      res.status(505).json({
        status: "fail",
        message: "Error while getting a passenger",
        Error: error.stack,
      });
    }
  };

const UpdatePassenger = async (req, res) => {
    try {
      const uuid = req.params.uuid;
      const { passengerName } = req.body;
  
      const passenger = await Passenger.findOne({ where: { uuid } });
  
      if (!passenger) {
        return res.status(404).json({
          status: "fail",
          message: "No Passenger Name found with that ID",
        });
      }
  
      passenger.passengerName = passengerName;
  
      await passenger.save();
  
      res.status(200).json({
        status: "success",
        message: "Passenger Updated Successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "Error while updating a Passenger",
        Error: error.stack,
  
      });
    }
  };
  const deletePassenger = async (req, res) => {
    try {
      const uuid = req.params.uuid;
  
      const passenger = await Passenger.findOne({
        where: { uuid },
      });
  
      if (!passenger) {
        return res.status(404).json({
          status: "fail",
          message: "No passenger Name found with that ID",
        });
      }
  
      await passenger.destroy();
  
      res.status(200).json({
        status: "success",
        message: "passenger Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "Error while deleting a passenger",
        err: error.stack,
      });
    }
  };

  module.exports = { createPassenger, getAllPassengers, getPassenger, UpdatePassenger, deletePassenger, removePassenger};