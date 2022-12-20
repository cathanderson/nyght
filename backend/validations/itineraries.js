const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateItineraryInput = [
  check("title")
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 30 })
    .withMessage("Itineray title must be between 5 and 30 characters"),
  handleValidationErrors,
];

module.exports = validateItineraryInput;
