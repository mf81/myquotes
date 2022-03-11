const express = require("express");
const mongoose = require("mongoose");
const texts = require("./routes/texts");

const app = express();
app.use(express.json());
app.use("/", texts);

mongoose.connect(
  "mongodb://localhost/myquotes",
  { useNewUrlParser: true },
  (err, res) => {
    if (err) throw err;
    console.log("Connected to DB");
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
