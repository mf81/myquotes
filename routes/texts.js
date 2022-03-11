const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Texts } = require("../models/textModel");

router.get("/", async (req, res) => {
  const allTexts = await Texts.find();
  res.send(allTexts);
});

router.get("/:id", async (req, res) => {
  const text = await Texts.find({ _id: req.params.id });
  res.send(text);
});

router.put("/:id", async (req, res) => {
  const result = await Texts.findByIdAndUpdate(
    { _id: req.params.id },
    { text: req.body.text }
  );
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const result = await Texts.deleteOne({ _id: req.params.id });
  res.send(result);
});

router.post("/", async (req, res) => {
  let postText = new Texts({
    text: req.body.text,
  });

  postText = await postText.save();
  res.send(postText);
});

module.exports = router;
