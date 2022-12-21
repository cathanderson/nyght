const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateEmailInput = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Email is invalid"),
  handleValidationErrors,
];

module.exports = validateEmailInput;
