const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = Schema(
  {
    neighborhood: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    lat: {
      type: Schema.Types.Decimal128,
      required: true
    },
    lng: {
      type: Schema.Types.Decimal128,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    resLink: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Venue", venueSchema);
