const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { requireUser } = require("../../config/passport");
const Itinerary = require("../../models/Itinerary");
const Email = require("../../models/Email");
const validateEmailInput = require("../../validations/emails");

router.get("/:itinerary", async (req, res, next) => {
  try {
    const emails = await Email.find({ itinerary: req.params.itinerary });
    return res.json(emails);
  } catch (err) {
    const error = new Error("Invalid list");
    error.statusCode = 404;
    error.errors = {
      message: `No email list was found with an itinerary id of ${req.params.itinerary}`,
    };
  }
});

router.post("/:itinerary", async (req, res, next) => {
  try {
    const newEmail = await new Email({
      itinerary: req.params.itinerary,
      email: req.body.email,
    });
    let email = newEmail.save();
    return res.json(email);
  } catch (err) {
    next(err);
  }
});

router.delete("/:itinerary", requireUser, async (req, res, next) => {
  Email.findByIdAndDelete(req.body.id, (err, email) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send({ Success: "Email deleted" });
    }
  });
});

module.exports = router;
