const {
  HomeController,
  ListenController,
  PORT,
} = require("./controllers/HomeController.js");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const { MailController } = require("./controllers/MailController.js");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", HomeController);
app.post("/mail", MailController);
app.listen(PORT, ListenController);
