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

router.delete("/:id", requireUser, async (req, res, next) => {
  const id = req.body.id;
  Email.findByIdAndDelete(req.params.id, (err, email) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send({ Success: "Email deleted", id: id });
    }
  });
});

router.patch("/:id", requireUser, async (req, res, next) => {
  const id = req.params.id;
  Email.findByIdAndUpdate(req.params.id, req.body, (err, email) => {
    if (err) {
      res.status(400).send(err);
    }
  })
    .clone()
    .then((email) => res.json(email));
});

module.exports = router;
