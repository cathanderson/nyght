const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

// validateRegisterInput is a combination Express middleware that uses the
// `check` middleware to validate the keys in the body of a request to
// register a user
const validateRegisterInput = [
  check("firstName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 15 })
    .withMessage("First name must be between 1 and 15 characters"),
  check("lastName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 15 })
    .withMessage("Last name must be between 1 and 15 characters"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Email is invalid"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6, max: 30 })
    .withMessage("Password must be between 6 and 30 characters"),
  handleValidationErrors,
];

module.exports = validateRegisterInput;
