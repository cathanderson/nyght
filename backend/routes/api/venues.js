const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { route } = require("./users");
const Venue = mongoose.model("Venue");

router.get("/", async (req, res) => {
  try {
    const events = await Venue.find();

    return res.json(events);
  } catch (err) {
    return res.json([]);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const event = await Venue.findById(req.params.id);
    return res.json(event);
  } catch (err) {
    const error = new Error("Venue not found");
    error.statusCode = 404;
    error.errors = { message: `No venue found with id of ${req.params.id}` };
    return next(error);
  }
});

router.get("/neighborhood/:neighborhood", async (req, res, next) => {
  try {
    const events = await Venue.find({
      neighborhood: req.params.neighborhood
    });
    return res.json(events);
  } catch (err) {
    const error = new Error("Invalid category");
    error.statusCode = 404;
    error.errors = {
      message: `No venues were found with a neighborhood of ${req.params.neighborhood}`
    };
    return next(error);
  }
});

module.exports = router;
