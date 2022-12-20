const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = Schema(
  {
    itinerary: {
      type: Schema.Types.ObjectId,
      ref: "Itinerary",
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);
module.exports = mongoose.model("Email", emailSchema);
