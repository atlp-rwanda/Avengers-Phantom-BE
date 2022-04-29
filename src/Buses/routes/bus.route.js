const express = require("express")
const {createBus,getAllBuses,getBus,updateBus,deleteBus} = require("./../controllers/bus.controller")

const router =  express.Router()

router.route('/').post(createBus).get(getAllBuses)
router.route('/:uuid').get(getBus).patch(updateBus).delete(deleteBus)

module.exports = router