const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itinerarySchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Venue",
    },
    dinner: {
      type: Schema.Types.ObjectId,
      ref: "Venue",
    },
    bar: {
      type: Schema.Types.ObjectId,
      ref: "Venue",
    },
    dessert: {
      type: Schema.Types.ObjectId,
      ref: "Venue",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
