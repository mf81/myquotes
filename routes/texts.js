const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Texts } = require("../models/textModel");

router.get("/", async (req, res) => {
  const allTexts = await Texts.find();
  res.send(allTexts);
});

router.get("/:id", async (req, res) => {
  try {
    const text = await Texts.find({ _id: req.params.id });
    res.send(text);
  } catch (err) {
    res.send(err.message);
  }
});

router.put("/:id", auth, role("user"), async (req, res) => {
  try {
    const result = await Texts.findByIdAndUpdate(
      { _id: req.params.id },
      { text: req.body.text }
    );
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/:id", auth, role("user"), async (req, res) => {
  try {
    const result = await Texts.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/", auth, role("user"), async (req, res) => {
  let postText = new Texts({
    text: req.body.text,
  });

  try {
    postText = await postText.save();
    res.send(postText);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
