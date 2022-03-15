const express = require("express");

const router = express.Router();
const User = require("../models/user.models");
const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.status(200).send({ user: user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.post(
  "/",
  body("first_name").not().isEmpty().withMessage("First Name cannot be empty"),
  body("last_name").not().isEmpty().withMessage("Last Name cannot be empty"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Last Name cannot be empty")
    .isEmail()
    .custom(async (val) => {
      const user = await User.findOne({ email: val });

      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  body("age")
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number between 1 and 100")
    .custom((val) => {
      if (val < 1 || val > 100) {
        throw new Error("Incorrect age provided");
      }
      return true;
    }),
  body("pincode")
    .not()
    .isEmpty()
    .withMessage("pincode cannot be empty")
    .isNumeric()
    .withMessage("pincode must be a number and exactly six digit")
    .custom((val) => {
      if (val.toString().length != 6) {
        throw new Error("Incorrect pincode is exactly six digit");
      }
      return true;
    }),
  body("gender")
    .not()
    .isEmpty()
    .withMessage("gender cannot be empty")

    .custom((val) => {
      let obj = {
        male: "true",
        Male: "true",
        Female: "true",
        female: "true",
        others: "true",
        Others: "true",
      };
      if (obj[val] != "true") {
        throw new Error("Incorrect gender should be Male,Female and Others");
      }
      return true;
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.create(req.body);
      return res.status(200).send({ user: user });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ user: user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
