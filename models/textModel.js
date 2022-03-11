const mongoose = require("mongoose");

const dbSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});

const Texts = mongoose.model("Texts", dbSchema);

exports.Texts = Texts;
