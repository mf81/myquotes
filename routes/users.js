const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Users } = require("../models/userModel");
const bcrypt = require("bcrypt");
const _ = require("lodash");

router.get("/", auth, role("admin"), async (req, res) => {
  let allUsers = await Users.find();
  allUsers = _.map(allUsers, (item) =>
    _.pick(item, "_id", "name", "email", "role")
  );
  res.send(allUsers);
});

router.get("/:id", auth, role(), async (req, res) => {
  try {
    let users = await Users.find({ _id: req.params.id });
    users = _.pick(users[0], ["_id", "name", "email", "role"]);
    res.send(users);
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/", auth, role(), async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPasword = await bcrypt.hash(req.body.password, salt);

  let postUsers = new Users({
    name: req.body.name,
    email: req.body.email,
    password: hashPasword,
    role: req.body.role,
  });

  try {
    postUsers = await postUsers.save();
    //const token = jwt.sign({ _id: postUsers._id }, config.get("JWT"));
    const token = postUsers.generateJWT();
    res
      .header("x-auth-token", token)
      .send(_.pick(postUsers, ["_id", "name", "email", "role"]));
  } catch (err) {
    res.send(err.message);
  }
});

router.put("/:id", auth, role(), async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPasword = await bcrypt.hash(req.body.password, salt);

    const result = await Users.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        email: req.body.email,
        password: hashPasword,
        role: req.body.role,
      }
    );
    const id = req.params.id;
    res.send({ id, ..._.pick(req.body, ["name", "email", "role"]) });
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/:id", auth, role(), async (req, res) => {
  try {
    const result = await Users.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
