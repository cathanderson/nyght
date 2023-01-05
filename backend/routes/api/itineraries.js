const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { requireUser } = require("../../config/passport");
const User = require("../../models/User");
const validateItineraryInput = require("../../validations/itineraries");
const Itinerary = mongoose.model("Itinerary");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

router.get("/:id", async (req, res, next) => {
  try {
    const itn = await Itinerary.findById(req.params.id);
    return res.json(itn);
  } catch (err) {
    const error = new Error("Itinerary not found");
    error.statusCode = 404;
    error.errors = {
      message: `No itinerary found with id of ${req.params.id}`,
    };
    return next(error);
  }
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

transporter.verify((err, success) => {
  err ? console.log(err) : console.log("Ready to send email");
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./routes/api/template/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./routes/api/template/"),
};

transporter.use("compile", hbs(handlebarOptions));

router.post("/send", (req, res) => {
  console.log(req.body);
  const mailOptions = {
    from: process.env.EMAIL,
    to: `${req.body.list}`,
    subject: `Message From NYGHT`,
    template: "email",
    context: {
      title: `${req.body.title}`,
      activity: `${req.body.activity.title}`,
      activityAddress: `${req.body.activity.address}`,
      restaurant: `${req.body.restaurant.title}`,
      restaurantAddress: `${req.body.restaurant.address}`,
      dessertOrBar: `${req.body.dessertOrBar.title}`,
      dessertOrBarAddress: `${req.body.dessertOrBar.address}`,
    },
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json({ status: `fail: ${err}` });
    } else {
      console.log("Message sent");
      res.json({ status: "success" });
    }
  });
});

router.get("/users/:userId", async (req, res, next) => {
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
  "/users/:userId",
  requireUser,
  validateItineraryInput,
  async (req, res, next) => {
    try {
      const newItn = new Itinerary({
        title: req.body.title,
        user: req.params.userId,
        event: req.body.eventId,
        dinner: req.body.dinnerId,
        bar: req.body.barId,
        dessert: req.body.dessertId,
        isDessert: req.body.isDessert,
      });
      let itn = await newItn.save();
      return res.json(itn);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", requireUser, async (req, res, next) => {
  Itinerary.findByIdAndDelete(req.params.id, (err, itn) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send({ Success: "Itinerary deleted" });
      console.log("success");
    }
  });
});

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
