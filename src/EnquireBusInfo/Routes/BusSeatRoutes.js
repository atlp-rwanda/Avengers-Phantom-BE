const express = require("express");
const { 
    busSeat
} = require("./../controllers/BusSeats")
const { Bus } = require('./../../../models')


const router = express.Router();

router.route("/").get()