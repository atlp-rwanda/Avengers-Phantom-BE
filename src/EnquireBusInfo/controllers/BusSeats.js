const { Bus } = require('./../../../models/bus');
const { Op } = require("sequelize");

const CreateBusSeat = async (req, res) => {
    try {
        const { busId } = req.params;
        console.log(busId);
        const bus = await Bus.findOne({ where: {uuid: busId} });
        console.log(bus);

        if (!bus) {
            return res.status(404).json({
              status: "fail",
              message: "No bus found with that ID",
            });
          }
        
        const countPassenger = await 

    

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error while count",
            err: error.stack,
        });
        console.erroe(error);
    }
};


module.exports = {
    busSeat
}