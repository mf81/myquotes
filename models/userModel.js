const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user", "writer"],
  },
});

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email, role: this.role },
    config.get("JWT")
  );
  return token;
};

const Users = mongoose.model("Users", userSchema);

exports.Users = Users;
