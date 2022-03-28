const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const texts = require("./routes/texts");
const users = require("./routes/users");
const authApp = require("./utilities/auth");
const cors = require("cors");

if (!config.get("JWT")) {
  console.error("JWT not found");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use("/texts", texts);
app.use("/users", users);
app.use("/auth", authApp);

mongoose.connect(
  "mongodb://localhost/myquotes",
  { useNewUrlParser: true },
  (err, res) => {
    if (err) throw err;
    console.log("Connected to DB");
  }
);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
