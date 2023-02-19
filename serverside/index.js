require("dotenv").config();
require("./src/models/User");
const express = require("express");
const app = express();
const authRoutes = require("./src/routes/authRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const requireAuth = require("./src/middleware/requireAuth");



mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlparser: true });
mongoose.connection.on("connected", () => {
  console.log("CONNECTED TO DATABASE");
});
mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(authRoutes);

app.get("/", requireAuth, cors(), (req, res) => {
  res.status(200).send("WELCOME TO WE MATCH BACKEND");
});

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`SERVER RUNNING ON PORT: ${process.env.PORT_NUMBER}`);
});
