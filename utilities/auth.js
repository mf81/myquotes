const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { Users } = require("../models/userModel");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid login or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid login or password");

  //const token = jwt.sign({ _id: user._id }, config.get("JWT"));
  const token = user.generateJWT();
  res.send(token);
});

async function validate(req) {
  const authSchema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "pl", "org", "info"] },
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  try {
    const value = await schema.validateAsync(req);
    return value;
  } catch (err) {
    return err;
  }
}

module.exports = router;

// const authSchema = Joi.object({
//     name: Joi.string().alphanum().min(3).max(30).required(),
//     email: Joi.string().email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net", "pl", "org", "info"] },
//     }),
//     password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
//     role: Joi.string().valid("admin", "user"),
//   });
