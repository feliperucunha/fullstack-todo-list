const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const eventRouter = require("./modules/events/routers/event.routes");

app.use(express.json());
app.use(cors());
app.use("/events", eventRouter);

mongoose
  .connect("mongodb://localhost/test", { useNewUrlParser: true })
  .then((con) => {
    console.log("CONNECTED TO THE DATABASE");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
