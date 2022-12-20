const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { requireUser } = require("../../config/passport");
const User = require("../../models/User");
const validateItineraryInput = require("../../validations/itineraries");
const Itinerary = mongoose.model("Itinerary");

router.get("/:id", async (req, res, next) => {
  try {
    const itn = await Itinerary.findById(req.params.id);
    return res.json(itn);
  } catch (err) {
    const error = new Error("Itineray not found");
    error.statusCode = 404;
    error.errors = {
      message: `No itinerary found with id of ${req.params.id}`,
    };
    return next(error);
  }
});

router.get("/users/:userId/", async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch (err) {
    const error = new Error("User not found");
    error.statusCode = 404;
    error.errors = { message: `No user found with id of ${req.params.userId}` };
    return next(error);
  }
  try {
    const itns = await Itinerary.find({ user: user._id }).sort({
      createdAt: -1,
    });
    return res.json(itns);
  } catch (err) {
    return res.json([]);
  }
});

router.post(
  "/",
  // requireUser,
  validateItineraryInput,
  async (req, res, next) => {
    try {
      console.log("before creating");
      const newItn = new Itinerary({
        title: req.body.title,
        user: req.body.userId, //replace with userId
        event: req.body.eventId,
        dinner: req.body.dinnerId,
        bar: req.body.barId,
        dessert: req.body.dessertId,
      });
      let itn = await newItn.save();
      return res.json(itn);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  //  requireUser,
  async (req, res, next) => {
    Itinerary.findByIdAndDelete(req.params.id, (err, itn) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send({ Success: "Itinerary deleted" });
      }
    });
  }
);

router.patch("/:id", requireUser, async (req, res, next) => {
  Itinerary.findByIdAndUpdate(req.params.id, req.body, (err, itn) => {
    if (err) {
      res.status(400).send(err);
    }
  })
    .clone()
    .then((itn) => res.json(itn));
});

module.exports = router;
